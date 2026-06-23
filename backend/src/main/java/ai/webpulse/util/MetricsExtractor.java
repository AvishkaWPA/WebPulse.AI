package ai.webpulse.util;

import ai.webpulse.dto.response.MetricsDto;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import lombok.extern.slf4j.Slf4j;

import java.net.URI;
import java.util.regex.Pattern;

@Slf4j
public class MetricsExtractor {

    private static final Pattern CTA_TEXT_PATTERN = Pattern.compile(
            ".*(sign[ -]?up|register|log[ -]?in|get[ -]?started|learn[ -]?more|buy[ -]?now|purchase|subscribe|contact|download|join|try|pricing|demo|start[ -]?free|submit|order|add[ -]?to[ -]?cart).*",
            Pattern.CASE_INSENSITIVE);

    private static final Pattern CTA_CLASS_PATTERN = Pattern.compile(
            ".*(btn|button|cta|call-to-action|action-link).*",
            Pattern.CASE_INSENSITIVE);

    public static MetricsDto extract(Document doc, String originalUrl) {
        log.info("Extracting metrics from document with base URI: {}", doc.baseUri());

        String baseHost = "";
        try {
            baseHost = URI.create(originalUrl).getHost();
        } catch (Exception e) {
            log.warn("Could not parse original URL host, using document base URI host", e);
            try {
                baseHost = URI.create(doc.baseUri()).getHost();
            } catch (Exception ex) {
                baseHost = "";
            }
        }
        if (baseHost == null) {
            baseHost = "";
        }

        // Word Count
        String bodyText = doc.body() != null ? doc.body().text() : "";
        int wordCount = countWords(bodyText);

        // Headings Count
        int h1Count = doc.select("h1").size();
        int h2Count = doc.select("h2").size();
        int h3Count = doc.select("h3").size();

        // Links Count
        int internalLinks = 0;
        int externalLinks = 0;
        Elements links = doc.select("a[href]");
        for (Element link : links) {
            String href = link.attr("href").trim();
            String absUrl = link.absUrl("href").trim();

            if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
                continue;
            }

            if (absUrl.startsWith("http://") || absUrl.startsWith("https://")) {
                try {
                    String linkHost = URI.create(absUrl).getHost();
                    if (linkHost != null && linkHost.equalsIgnoreCase(baseHost)) {
                        internalLinks++;
                    } else {
                        externalLinks++;
                    }
                } catch (Exception e) {
                    // Fallback to simple matching if URI creation fails
                    if (absUrl.contains(baseHost)) {
                        internalLinks++;
                    } else {
                        externalLinks++;
                    }
                }
            } else if (!href.isEmpty()
                    && (href.startsWith("/") || href.startsWith("#") || href.startsWith(".") || href.startsWith("?"))) {
                internalLinks++;
            }
        }

        // Images and Alt Attribute Metrics
        Elements images = doc.select("img");
        int imageCount = images.size();
        int missingAltCount = 0;
        for (Element img : images) {
            String alt = img.attr("alt");
            if (alt == null || alt.trim().isEmpty()) {
                missingAltCount++;
            }
        }
        double missingAltPercentage = imageCount > 0
                ? Math.round((missingAltCount * 100.0 / imageCount) * 10.0) / 10.0
                : 0.0;

        // Meta Title
        String metaTitle = doc.title();
        if (metaTitle == null || metaTitle.trim().isEmpty()) {
            Element ogTitle = doc.selectFirst("meta[property=og:title]");
            if (ogTitle != null) {
                metaTitle = ogTitle.attr("content");
            }
        }
        if (metaTitle == null) {
            metaTitle = "";
        } else {
            metaTitle = metaTitle.trim();
        }

        // Meta Description
        String metaDescription = "";
        Element descTag = doc.selectFirst("meta[name=description]");
        if (descTag != null) {
            metaDescription = descTag.attr("content");
        } else {
            Element ogDesc = doc.selectFirst("meta[property=og:description]");
            if (ogDesc != null) {
                metaDescription = ogDesc.attr("content");
            }
        }
        if (metaDescription == null) {
            metaDescription = "";
        } else {
            metaDescription = metaDescription.trim();
        }

        // CTA Count
        int ctaCount = 0;
        // Count buttons
        Elements buttons = doc.select("button, input[type=button], input[type=submit]");
        ctaCount += buttons.size();

        // Check anchor tags for CTA attributes or content
        for (Element link : links) {
            String text = link.text().trim();
            String classes = link.className().trim();

            boolean isCtaText = CTA_TEXT_PATTERN.matcher(text).matches();
            boolean isCtaClass = CTA_CLASS_PATTERN.matcher(classes).matches();

            if (isCtaText || isCtaClass) {
                ctaCount++;
            }
        }

        // Reading Time (Word Count / 200)
        int readingTime = (int) Math.ceil(wordCount / 200.0);
        if (readingTime == 0 && wordCount > 0) {
            readingTime = 1;
        }

        // Text to HTML Ratio
        double textToHtmlRatio = 0.0;
        String htmlSource = doc.html();
        if (htmlSource != null && !htmlSource.isEmpty()) {
            int htmlLength = htmlSource.length();
            int textLength = doc.text().length();
            textToHtmlRatio = Math.round((textLength * 100.0 / htmlLength) * 100.0) / 100.0;
        }

        return MetricsDto.builder()
                .wordCount(wordCount)
                .h1Count(h1Count)
                .h2Count(h2Count)
                .h3Count(h3Count)
                .internalLinks(internalLinks)
                .externalLinks(externalLinks)
                .imageCount(imageCount)
                .missingAltPercentage(missingAltPercentage)
                .metaTitle(metaTitle)
                .metaDescription(metaDescription)
                .ctaCount(ctaCount)
                .readingTime(readingTime)
                .textToHtmlRatio(textToHtmlRatio)
                .build();
    }

    private static int countWords(String text) {
        if (text == null || text.trim().isEmpty()) {
            return 0;
        }
        String[] words = text.trim().split("\\s+");
        return words.length;
    }
}
