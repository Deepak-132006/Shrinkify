package com.deepak.shrinkify.service;

import com.deepak.shrinkify.dto.UrlRequest;
import com.deepak.shrinkify.model.Url;

public interface UrlService {
    String shorten(UrlRequest request, String baseUrl);
    Url getByShortCode(String shortCode);
}
