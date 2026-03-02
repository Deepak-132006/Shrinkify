package com.deepak.shrinkify.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UrlResponse {
    private String shortUrl;

    public UrlResponse(String shortUrl) {
        this.shortUrl = shortUrl;
    }
}
