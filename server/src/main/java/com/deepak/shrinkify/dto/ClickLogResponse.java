package com.deepak.shrinkify.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
public class ClickLogResponse {
    private LocalDateTime timeStamp;
    private String ip;
    private String userAgent;
}
