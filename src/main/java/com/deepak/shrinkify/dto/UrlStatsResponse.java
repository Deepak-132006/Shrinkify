package com.deepak.shrinkify.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class UrlStatsResponse {
    private String originalUrl;
    private String shortCode;
    private int clickCount;
    private LocalDateTime createdAt;
    private List<ClickLogResponse> recentClicks;
}
