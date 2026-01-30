package com.deepak.shrinkify.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

@Getter
@Setter
@NoArgsConstructor
public class UrlRequest {
    @NotBlank
    @URL
    private String originalUrl;
}
