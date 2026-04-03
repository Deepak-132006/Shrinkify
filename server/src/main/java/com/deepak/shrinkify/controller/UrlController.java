package com.deepak.shrinkify.controller;

import com.deepak.shrinkify.dto.UrlRequest;
import com.deepak.shrinkify.dto.UrlResponse;
import com.deepak.shrinkify.dto.UrlStatsResponse;
import com.deepak.shrinkify.model.Url;
import com.deepak.shrinkify.service.UrlService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1")
public class UrlController {

    private final UrlService urlService;

    @Value("${app.base-url:https://shrinkify-app.onrender.com/}")
    private String baseUrl;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }


    @PostMapping("/shorten")
    public ResponseEntity<UrlResponse> shorten(@Valid @RequestBody UrlRequest request) {
        String shortUrl = urlService.shorten(request, baseUrl + "/api/v1/r");
        return ResponseEntity.ok(new UrlResponse(shortUrl));
    }


    @GetMapping("/r/{shortCode}")
    public ResponseEntity<Void> redirect(@PathVariable String shortCode, HttpServletRequest request) {
        Url url = urlService.getByShortCode(shortCode, request);
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(url.getOriginalUrl()))
                .build();
    }
    @GetMapping("/stats/{shortCode}")
    public ResponseEntity<UrlStatsResponse> getStats(@PathVariable String shortCode){
        UrlStatsResponse stats = urlService.getStatsByShortCode(shortCode);
        return ResponseEntity.ok(stats);
    }
}
