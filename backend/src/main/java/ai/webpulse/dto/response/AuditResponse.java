package ai.webpulse.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditResponse {
    private ScoreDto score;
    private MetricsDto metrics;
    private InsightsDto insights;
    private List<RecommendationDto> recommendations;
}
