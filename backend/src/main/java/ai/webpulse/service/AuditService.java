package ai.webpulse.service;

import ai.webpulse.dto.response.AiAnalysisResult;
import ai.webpulse.dto.response.AuditResponse;
import ai.webpulse.dto.response.MetricsDto;
import ai.webpulse.dto.response.ScoreDto;
import ai.webpulse.util.MetricsExtractor;
import org.jsoup.nodes.Document;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuditService {

    private final ScraperService scraperService;
    private final ScoringService scoringService;
    private final AiAnalyzerService aiAnalyzerService;
    private final ContentSummaryService contentSummaryService;

    public AuditService(ScraperService scraperService, ScoringService scoringService,
            AiAnalyzerService aiAnalyzerService, ContentSummaryService contentSummaryService) {
        this.scraperService = scraperService;
        this.scoringService = scoringService;
        this.aiAnalyzerService = aiAnalyzerService;
        this.contentSummaryService = contentSummaryService;
    }

    public AuditResponse performAudit(String url) {
        log.info("Starting website audit process for: {}", url);

        Document doc = scraperService.fetchWebpage(url);

        MetricsDto metrics = MetricsExtractor.extract(doc, url);

        // Generate Content Summary (for AI context)
        String contentSummary = contentSummaryService.buildContentSummary(doc);

        // AI Insights & Recommendations (AI Model)
        AiAnalysisResult aiResult = aiAnalyzerService.analyze(metrics, contentSummary);

        // Deterministic rule-based scoring (No AI)
        ScoreDto scores = scoringService.calculateScores(metrics);

        log.info("Successfully completed website audit for: {}", url);

        // Combine into final response
        return AuditResponse.builder()
                .score(scores)
                .metrics(metrics)
                .insights(aiResult.getInsights())
                .recommendations(aiResult.getRecommendations())
                .build();
    }
}
