package ai.webpulse.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScoreDto {
    private int overall;
    private int seo;
    private int content;
    private int ux;
    private int bestPractices;
}
