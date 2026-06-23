package ai.webpulse.service;

import ai.webpulse.dto.response.AiAnalysisResult;
import ai.webpulse.dto.response.InsightsDto;
import ai.webpulse.dto.response.MetricsDto;
import ai.webpulse.dto.response.RecommendationDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AiAnalyzerService {

    private final ChatModel chatModel;
    private final ObjectMapper objectMapper;

    public AiAnalysisResult analyze(MetricsDto metrics, String contentSummary) {
        try {
            log.info("Sending website audit data to AI model");
            SystemMessage systemMessage = new SystemMessage(buildSystemPrompt());
            UserMessage userMessage = new UserMessage(buildUserPrompt(metrics, contentSummary));

            Prompt prompt = new Prompt(List.of(systemMessage, userMessage));

            String response = chatModel.call(prompt).getResult().getOutput().getText();
            AiAnalysisResult result = parseResponse(response);
            
            if (result == null || result.getInsights() == null || result.getRecommendations() == null) {
                log.warn("Using deterministic fallback analysis");
                return generateFallback(metrics);
            }
            
            log.info("Successfully received AI analysis");
            return result;
        } catch (Exception e) {
            log.error("AI Analysis failed. Using deterministic fallback.", e);
            log.warn("Using deterministic fallback analysis");
            return generateFallback(metrics);
        }
    }

    private String buildSystemPrompt() {
        return "You are WebPulse AI, an expert website auditing assistant. Your task is to analyze the extracted metrics, metadata, and content summary of a webpage and generate professional, data-driven, and actionable insights and recommendations.\n\n"
                + "You must output your analysis ONLY as a valid JSON object matching the following JSON schema:\n"
                + "{\n"
                + "  \"insights\": {\n"
                + "    \"seoStructure\": \"Detailed analysis of SEO headers, headings hierarchy, title, and description.\",\n"
                + "    \"messagingClarity\": \"Analysis of the clarity of the primary headings and value propositions.\",\n"
                + "    \"ctaUsage\": \"Analysis of CTA buttons placement, density, and effectiveness.\",\n"
                + "    \"contentDepth\": \"Analysis of word count, readability, and information density.\",\n"
                + "    \"uxConcerns\": \"Analysis of usability issues like missing image alt attributes, layout complexity, etc.\"\n"
                + "  },\n"
                + "  \"recommendations\": [\n"
                + "    {\n"
                + "      \"priority\": \"HIGH | MEDIUM | LOW\",\n"
                + "      \"category\": \"SEO | Content | UX | Best Practices\",\n"
                + "      \"title\": \"A brief actionable recommendation title\",\n"
                + "      \"description\": \"A detailed explanation of the issue, how to fix it, and why it matters.\",\n"
                + "      \"metricImpacted\": \"The name of the metric this recommendation directly addresses (e.g., 'Missing Alt Percentage', 'Word Count', 'CTA Count', etc.)\"\n"
                + "    }\n"
                + "  ]\n"
                + "}\n\n"
                + "Strictly follow these rules:\n"
                + "1. Provide between 3 and 5 recommendations.\n"
                + "2. Ensure recommendations are actionable, specific, and directly tied to the metrics provided.\n"
                + "3. Keep the tone professional, objective, and helpful.\n"
                + "4. Never include markdown wrappers (such as ```json) around the JSON output, return only raw JSON.";
    }

    private String buildUserPrompt(MetricsDto metrics, String contentSummary) {
        return String.format(
                "Please analyze the following website audit data and provide insights and recommendations:\n\n"
                        + "### Extracted Metrics:\n"
                        + "- Word Count: %d\n"
                        + "- H1 Count: %d\n"
                        + "- H2 Count: %d\n"
                        + "- H3 Count: %d\n"
                        + "- Internal Links: %d\n"
                        + "- External Links: %d\n"
                        + "- Image Count: %d\n"
                        + "- Missing Alt Percentage: %.1f%%\n"
                        + "- CTA Count: %d\n"
                        + "- Reading Time: %d minutes\n"
                        + "- Text To HTML Ratio: %.2f%%\n\n"
                        + "### Metadata:\n"
                        + "- Meta Title: \"%s\"\n"
                        + "- Meta Description: \"%s\"\n\n"
                        + "### Content Summary (Heading Hierarchy & Cleaned Content):\n%s",
                metrics.getWordCount(), metrics.getH1Count(), metrics.getH2Count(), metrics.getH3Count(),
                metrics.getInternalLinks(), metrics.getExternalLinks(), metrics.getImageCount(),
                metrics.getMissingAltPercentage(), metrics.getCtaCount(), metrics.getReadingTime(),
                metrics.getTextToHtmlRatio(), metrics.getMetaTitle(), metrics.getMetaDescription(),
                contentSummary);
    }

    private AiAnalysisResult parseResponse(String rawResponse) {
        try {
            String cleanJson = rawResponse.trim();
            // Remove markdown code block fences if present
            if (cleanJson.startsWith("```")) {
                cleanJson = cleanJson.replaceAll("^```[a-zA-Z]*\\s*", "");
                cleanJson = cleanJson.replaceAll("\\s*```$", "");
            }
            cleanJson = cleanJson.trim();
            return objectMapper.readValue(cleanJson, AiAnalysisResult.class);
        } catch (Exception e) {
            log.error("Failed to parse raw JSON from LLM. Raw response starts with: {}", 
                    rawResponse.substring(0, Math.min(100, rawResponse.length())), e);
            throw new RuntimeException("Failed to process AI analysis result", e);
        }
    }

    private AiAnalysisResult generateFallback(MetricsDto metrics) {
        // Build insights
        String seoStructure = metrics.getH1Count() == 1
                ? "The page has a single H1 heading, which forms a solid SEO foundation. Header metadata tags are present."
                : String.format(
                        "The page has %d H1 tags. Having exactly one H1 tag is recommended for proper search index structure.",
                        metrics.getH1Count());

        String messagingClarity = metrics.getMetaTitle() != null && !metrics.getMetaTitle().isBlank()
                ? "The meta title is defined and clear. Primary headers align with target branding."
                : "The main page headers are clear, but the missing meta title makes it difficult for search bots to identify the core message.";

        String ctaUsage = metrics.getCtaCount() >= 3
                ? String.format(
                        "There are %d Call-to-Action elements, which provides good options for user conversion.",
                        metrics.getCtaCount())
                : String.format(
                        "Only %d Call-to-Action elements found. Increasing CTA buttons would improve user click-through and engagement.",
                        metrics.getCtaCount());

        String contentDepth = String.format(
                "The page has a word count of %d, with a text-to-HTML ratio of %.2f%%. Reading time is estimated at %d minutes.",
                metrics.getWordCount(), metrics.getTextToHtmlRatio(), metrics.getReadingTime());

        String uxConcerns = metrics.getMissingAltPercentage() > 0
                ? String.format("Accessibility issue detected: %.1f%% of images are missing descriptive alt tags.",
                        metrics.getMissingAltPercentage())
                : "Images have descriptive alt tags, showing good accessibility practice.";

        InsightsDto insights = InsightsDto.builder()
                .seoStructure(seoStructure)
                .messagingClarity(messagingClarity)
                .ctaUsage(ctaUsage)
                .contentDepth(contentDepth)
                .uxConcerns(uxConcerns)
                .build();

        // Build recommendations
        List<RecommendationDto> recommendations = new ArrayList<>();

        if (metrics.getH1Count() != 1) {
            recommendations.add(RecommendationDto.builder()
                    .priority("HIGH")
                    .category("SEO")
                    .title(metrics.getH1Count() == 0 ? "Add an H1 heading" : "Consolidate H1 headings")
                    .description(metrics.getH1Count() == 0
                            ? "There is no H1 heading on the page. Add a single primary H1 tag that encapsulates the page's core topic."
                            : "Multiple H1 headings detected. Consolidate them so that there is exactly one H1 representing the page title, and demote others to H2.")
                    .metricImpacted("H1 Count")
                    .build());
        }

        if (metrics.getMissingAltPercentage() > 0) {
            recommendations.add(RecommendationDto.builder()
                    .priority("HIGH")
                    .category("UX")
                    .title("Add alt text to images")
                    .description(String.format(
                            "%.1f%% of image elements are missing alt text. Adding descriptive alt attributes improves accessibility for screen readers and search engines.",
                            metrics.getMissingAltPercentage()))
                    .metricImpacted("Missing Alt Percentage")
                    .build());
        }

        if (metrics.getMetaTitle() == null || metrics.getMetaTitle().isBlank()) {
            recommendations.add(RecommendationDto.builder()
                    .priority("HIGH")
                    .category("SEO")
                    .title("Define meta title")
                    .description(
                            "The page has no meta title element. Add a descriptive title between 50-60 characters containing target search keywords.")
                    .metricImpacted("Meta Title")
                    .build());
        }

        if (metrics.getMetaDescription() == null || metrics.getMetaDescription().isBlank()) {
            recommendations.add(RecommendationDto.builder()
                    .priority("HIGH")
                    .category("SEO")
                    .title("Define meta description")
                    .description(
                            "The page has no meta description element. Add a meta description between 150-160 characters to optimize organic click-through rates.")
                    .metricImpacted("Meta Description")
                    .build());
        }

        if (metrics.getCtaCount() == 0) {
            recommendations.add(RecommendationDto.builder()
                    .priority("HIGH")
                    .category("UX")
                    .title("Add call-to-action buttons")
                    .description(
                            "Zero Call-to-Action buttons found. Add conversion touchpoints (e.g. 'Get Started', 'Contact Us') above the fold.")
                    .metricImpacted("CTA Count")
                    .build());
        }

        if (metrics.getWordCount() < 300) {
            recommendations.add(RecommendationDto.builder()
                    .priority("LOW")
                    .category("Content")
                    .title("Expand thin page content")
                    .description(String.format("The word count is only %d. Expand the page text to at least 300 words to provide helpful detail and prevent search engine indexing flags.", metrics.getWordCount()))
                    .metricImpacted("Word Count")
                    .build());
        }

        // Limit to 3-5 recommendations using new ArrayList to avoid subList modification issues
        List<RecommendationDto> limitedRecs = new ArrayList<>(
                recommendations.subList(0, Math.min(5, recommendations.size())));
                
        if (limitedRecs.size() < 3) {
            // Add a default low-priority recommendation if count is small
            limitedRecs.add(RecommendationDto.builder()
                    .priority("LOW")
                    .category("Best Practices")
                    .title("Monitor internal links density")
                    .description(String.format("Currently there are %d internal links. Review internal link architecture regularly to optimize page authority routing.", metrics.getInternalLinks()))
                    .metricImpacted("Internal Links")
                    .build());
        }

        return new AiAnalysisResult(insights, limitedRecs);
    }
}
