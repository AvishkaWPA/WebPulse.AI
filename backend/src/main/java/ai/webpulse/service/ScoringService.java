package ai.webpulse.service;

import ai.webpulse.dto.response.MetricsDto;
import ai.webpulse.dto.response.ScoreDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ScoringService {

    public ScoreDto calculateScores(MetricsDto metrics) {
        log.info("Calculating deterministic audit scores");

        int seo = calculateSeoScore(metrics);
        int content = calculateContentScore(metrics);
        int ux = calculateUxScore(metrics);
        int bestPractices = calculateBestPracticesScore(metrics);
        
        int overall = (int) Math.round((seo + content + ux + bestPractices) / 4.0);

        return ScoreDto.builder()
                .overall(overall)
                .seo(seo)
                .content(content)
                .ux(ux)
                .bestPractices(bestPractices)
                .build();
    }

    private int calculateSeoScore(MetricsDto metrics) {
        int score = 100;

        // Meta Title Check
        if (metrics.getMetaTitle() == null || metrics.getMetaTitle().isBlank()) {
            score -= 30;
        }

        // Meta Description Check
        if (metrics.getMetaDescription() == null || metrics.getMetaDescription().isBlank()) {
            score -= 30;
        }

        // H1 Count Check
        if (metrics.getH1Count() == 0) {
            score -= 20;
        } else if (metrics.getH1Count() > 1) {
            score -= 10;
        }

        // Links presence
        if (metrics.getInternalLinks() == 0 && metrics.getExternalLinks() == 0) {
            score -= 20;
        } else if (metrics.getInternalLinks() == 0 || metrics.getExternalLinks() == 0) {
            score -= 10;
        }

        return Math.max(0, Math.min(100, score));
    }

    private int calculateContentScore(MetricsDto metrics) {
        int score = 100;

        // Word Count Check
        int wordCount = metrics.getWordCount();
        if (wordCount < 100) {
            score -= 50;
        } else if (wordCount < 300) {
            score -= 30;
        } else if (wordCount < 600) {
            score -= 15;
        }

        // Headings Structure Check
        int headingsCount = metrics.getH2Count() + metrics.getH3Count();
        if (metrics.getH2Count() == 0 && metrics.getH3Count() == 0) {
            score -= 30;
        } else if (headingsCount < 3) {
            score -= 15;
        }

        // Text to HTML Ratio Check
        double ratio = metrics.getTextToHtmlRatio();
        if (ratio < 2.0) {
            score -= 30;
        } else if (ratio < 10.0) {
            score -= 15;
        }

        return Math.max(0, Math.min(100, score));
    }

    private int calculateUxScore(MetricsDto metrics) {
        int score = 100;

        // Image Alt Attribute Check
        if (metrics.getImageCount() > 0) {
            score -= (int) Math.round(metrics.getMissingAltPercentage() * 0.4);
        }

        // CTA Count Check
        int ctaCount = metrics.getCtaCount();
        if (ctaCount == 0) {
            score -= 30;
        } else if (ctaCount < 3) {
            score -= 10;
        } else if (ctaCount > 8) {
            score -= 15; // too spammy
        }

        // Structure check
        if (metrics.getH1Count() > 2) {
            score -= 15; // confusing semantic layout
        }

        return Math.max(0, Math.min(100, score));
    }

    private int calculateBestPracticesScore(MetricsDto metrics) {
        int score = 100;

        // Alt tags completeness
        if (metrics.getMissingAltPercentage() > 0) {
            score -= 15;
        }

        // Title length standards
        int titleLen = metrics.getMetaTitle() != null ? metrics.getMetaTitle().length() : 0;
        if (titleLen > 0 && (titleLen < 10 || titleLen > 70)) {
            score -= 15;
        }

        // Description length standards
        int descLen = metrics.getMetaDescription() != null ? metrics.getMetaDescription().length() : 0;
        if (descLen > 0 && (descLen < 50 || descLen > 160)) {
            score -= 15;
        }

        // Excessive H1 tags
        if (metrics.getH1Count() > 1) {
            score -= 15;
        }

        // Outbound links check (spam check)
        if (metrics.getExternalLinks() > 30) {
            score -= 15;
        }

        return Math.max(0, Math.min(100, score));
    }
}
