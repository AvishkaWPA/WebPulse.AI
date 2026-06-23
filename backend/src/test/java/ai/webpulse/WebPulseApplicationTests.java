package ai.webpulse;

import ai.webpulse.service.ScraperService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(properties = "spring.ai.google.genai.api-key=dummy-api-key-for-testing")
class WebPulseApplicationTests {

    @Autowired
    private ScraperService scraperService;

    @Test
    void contextLoads() {
    }

    @Test
    void testLocalIpBlocked() {
        // Assert that loopback IP causes an IllegalArgumentException
        assertThrows(IllegalArgumentException.class, () -> {
            scraperService.fetchWebpage("http://127.0.0.1:8080");
        });

        // Assert that localhost host resolution blocks request
        assertThrows(IllegalArgumentException.class, () -> {
            scraperService.fetchWebpage("http://localhost:3000");
        });
        
        // Assert that private range IP blocks request
        assertThrows(IllegalArgumentException.class, () -> {
            scraperService.fetchWebpage("http://192.168.1.1");
        });
    }

    @Test
    void testInvalidSchemeBlocked() {
        // Assert that ftp scheme is blocked
        assertThrows(IllegalArgumentException.class, () -> {
            scraperService.fetchWebpage("ftp://example.com");
        });

        // Assert that file scheme is blocked
        assertThrows(IllegalArgumentException.class, () -> {
            scraperService.fetchWebpage("file:///etc/passwd");
        });

        // Assert that mailto scheme is blocked
        assertThrows(IllegalArgumentException.class, () -> {
            scraperService.fetchWebpage("mailto:test@example.com");
        });
    }
}
