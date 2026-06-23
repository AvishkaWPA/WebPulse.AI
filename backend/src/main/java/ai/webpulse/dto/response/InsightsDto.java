package ai.webpulse.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InsightsDto {
    private String seoStructure;
    private String messagingClarity;
    private String ctaUsage;
    private String contentDepth;
    private String uxConcerns;
}
