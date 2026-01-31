package com.deepak.shrinkify.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UrlRequest {
    @NotBlank(message = "Original URL cannot be blank")
    @Size(max = 2000, message = "URL too long")
    private String originalUrl;
}
