package com.deepak.shrinkify.service;

import com.deepak.shrinkify.dto.UrlRequest;
import com.deepak.shrinkify.dto.UrlStatsResponse;
import com.deepak.shrinkify.model.Url;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface UrlService {
    String shorten(UrlRequest request, String baseUrl);
    Url getByShortCode(String shortCode, HttpServletRequest request);
    UrlStatsResponse getStatsByShortCode(String shortCode);
}
