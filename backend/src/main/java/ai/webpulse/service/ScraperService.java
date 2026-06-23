package ai.webpulse.service;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.net.URI;
import java.net.UnknownHostException;

@Service
@Slf4j
public class ScraperService {
    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 WebPulseAI/1.0";
    private static final int TIMEOUT_MS = 10000;

    public Document fetchWebpage(String urlString) {
        log.info("Starting audit fetch for URL: {}", urlString);
        validateUrl(urlString);

        try {
            return Jsoup.connect(urlString)
                    .userAgent(USER_AGENT)
                    .timeout(TIMEOUT_MS)
                    .followRedirects(true)
                    .get();
        } catch (Exception e) {
            log.error("Failed to fetch webpage content from URL: {}", urlString, e);
            throw new RuntimeException("Unable to access the specified website", e);
        }
    }

    private void validateUrl(String urlString) {
        try {
            URI uri = URI.create(urlString);
            String scheme = uri.getScheme();
            if (scheme == null || (!scheme.equalsIgnoreCase("http") && !scheme.equalsIgnoreCase("https"))) {
                throw new IllegalArgumentException("Only HTTP and HTTPS URLs are supported");
            }

            String host = uri.getHost();
            if (host == null || host.isBlank()) {
                throw new IllegalArgumentException("Invalid host in URL");
            }

            // Resolve host to IP addresses to prevent SSRF
            InetAddress[] addresses = InetAddress.getAllByName(host);
            for (InetAddress address : addresses) {
                if (address.isLoopbackAddress() ||
                        address.isAnyLocalAddress() ||
                        address.isLinkLocalAddress() ||
                        address.isSiteLocalAddress() ||
                        address.isMulticastAddress()) {
                    log.warn("Blocked SSRF request to local/private IP: {}", address.getHostAddress());
                    throw new IllegalArgumentException("Access to local/private IP addresses is restricted");
                }
            }
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (UnknownHostException e) {
            log.warn("Unknown host: {}", urlString);
            throw new IllegalArgumentException("Unable to resolve the host: " + e.getMessage());
        } catch (Exception e) {
            log.error("URL validation failed for: {}", urlString, e);
            throw new IllegalArgumentException("Invalid URL format or scheme");
        }
    }
}
