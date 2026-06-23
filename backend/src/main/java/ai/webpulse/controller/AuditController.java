package ai.webpulse.controller;

import ai.webpulse.dto.request.AuditRequest;
import ai.webpulse.dto.response.AuditResponse;
import ai.webpulse.service.AuditService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@Slf4j
public class AuditController {

    private final AuditService auditService;

    public AuditController(AuditService auditService) {
        this.auditService = auditService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        log.debug("Health check requested");
        return ResponseEntity.ok(Map.of("status", "UP", "message", "WebPulse AI Audit Platform is active"));
    }

    @PostMapping("/audits")
    public ResponseEntity<AuditResponse> runAudit(
            @Valid @RequestBody AuditRequest request) {
        return ResponseEntity.ok(auditService.performAudit(request.getUrl()));
    }
}
