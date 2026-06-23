package ai.webpulse.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetricsDto {
    private int wordCount;
    private int h1Count;
    private int h2Count;
    private int h3Count;
    private int internalLinks;
    private int externalLinks;
    private int imageCount;
    private double missingAltPercentage;
    private String metaTitle;
    private String metaDescription;
    private int ctaCount;
    private int readingTime;
    private double textToHtmlRatio;
}
