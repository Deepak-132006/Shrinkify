package com.deepak.shrinkify.service;

import com.deepak.shrinkify.dto.ClickLogResponse;
import com.deepak.shrinkify.dto.UrlRequest;
import com.deepak.shrinkify.dto.UrlStatsResponse;
import com.deepak.shrinkify.exception.NotFoundException;
import com.deepak.shrinkify.model.ClickLog;
import com.deepak.shrinkify.model.Url;
import com.deepak.shrinkify.repository.ClickLogRepository;
import com.deepak.shrinkify.repository.UrlRepository;
import com.deepak.shrinkify.util.Base62Encoder;
import jakarta.servlet.http.HttpServletRequest;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.util.List;

@Service
public class UrlServiceImpl implements UrlService {

    private final UrlRepository urlRepository;
    private final ClickLogRepository clickLogRepository;

    public UrlServiceImpl(UrlRepository urlRepository, ClickLogRepository clickLogRepository) {
        this.urlRepository = urlRepository;
        this.clickLogRepository = clickLogRepository;
    }

    private boolean isValidUrl(String url) {
        try {
            URI uri = new URI(url.trim());
            if (uri.getScheme() == null || uri.getHost() == null) return false;

            String scheme = uri.getScheme().toLowerCase();
            return scheme.equals("http") || scheme.equals("https");
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public String shorten(@NonNull UrlRequest request, String baseUrl) {
        String originalUrl = request.getOriginalUrl();
        if (!isValidUrl(originalUrl)) {
            throw new IllegalArgumentException("Invalid URL: must start with http:// or https://");
        }
        Url existingUrl = urlRepository.findByOriginalUrl(request.getOriginalUrl())
                .orElse(null);

        if (existingUrl != null) {
            return baseUrl.endsWith("/") ? baseUrl + existingUrl.getShortCode()
                    : baseUrl + "/" + existingUrl.getShortCode();
        }

        Url url = new Url();
        url.setOriginalUrl(originalUrl);
        url.setClickCount(0);

        url = urlRepository.save(url);

        String shortCode = Base62Encoder.encoder(url.getId());
        url.setShortCode(shortCode);

        urlRepository.save(url);

        return baseUrl.endsWith("/") ? baseUrl + shortCode : baseUrl + "/" + shortCode;
    }

    @Override
    @Transactional
    public Url getByShortCode(String shortCode, HttpServletRequest request) {
        long id;
        try {
            id = Base62Encoder.decode(shortCode);
        } catch (Exception e) {
            throw new NotFoundException("Invalid short URL");
        }
        Url url = urlRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Short URL not found"));
        url.setClickCount(url.getClickCount() + 1);

        ClickLog log = new ClickLog();
        log.setUrl(url);
        log.setIpAddress(request.getRemoteAddr());
        log.setUserAgent(request.getHeader("User-Agent"));
        clickLogRepository.save(log);

        return url;
    }

    @Override
    @Transactional(readOnly = true)
    public UrlStatsResponse getStatsByShortCode(String shortCode){
        long id = Base62Encoder.decode(shortCode);
        Url url = urlRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Short URL Not Found"));
        List<ClickLog> logs = clickLogRepository.findRecentByUrl(url);

        List<ClickLogResponse> recentClicks = logs.stream()
                .map(log -> new ClickLogResponse(
                        log.getClickedAt(),
                        log.getIpAddress(),
                        log.getUserAgent()
                ))
                .toList();
        return new UrlStatsResponse(
                url.getOriginalUrl(),
                url.getShortCode(),
                url.getClickCount(),
                url.getCreatedAt(),
                recentClicks
        );
    }
}
