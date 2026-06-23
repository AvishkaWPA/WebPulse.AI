package ai.webpulse.service;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Service
public class ContentSummaryService {

    public String buildContentSummary(Document doc) {
        StringBuilder sb = new StringBuilder();

        // Add heading outline
        Elements headings = doc.select("h1, h2, h3");
        sb.append("--- Headings Structure ---\n");
        if (headings.isEmpty()) {
            sb.append("No H1, H2, or H3 tags found.\n");
        } else {
            for (Element heading : headings) {
                sb.append(heading.tagName().toUpperCase()).append(": ").append(heading.text().trim()).append("\n");
            }
        }
        sb.append("\n");

        // Add text snippet (up to 2000 chars)
        sb.append("--- Text Content Snippet ---\n");
        String bodyText = doc.body() != null ? doc.body().text() : doc.text();
        if (bodyText != null) {
            String trimmedText = bodyText.trim();
            if (trimmedText.length() > 2000) {
                sb.append(trimmedText, 0, 2000).append("... [TRUNCATED]");
            } else {
                sb.append(trimmedText);
            }
        }

        return sb.toString();
    }
}
