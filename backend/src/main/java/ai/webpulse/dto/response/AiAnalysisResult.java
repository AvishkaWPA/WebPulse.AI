package ai.webpulse.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AiAnalysisResult {
    private InsightsDto insights;
    private List<RecommendationDto> recommendations;
}
