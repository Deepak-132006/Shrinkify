package com.deepak.shrinkify.service;

import com.deepak.shrinkify.dto.UrlRequest;
import com.deepak.shrinkify.exception.NotFoundException;
import com.deepak.shrinkify.model.Url;
import com.deepak.shrinkify.repository.UrlRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;

@Service
public class UrlServiceImpl implements UrlService {

    private final UrlRepository urlRepository;
    private static final String ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int CODE_LENGTH = 6;
    private final SecureRandom random = new SecureRandom();

    public UrlServiceImpl(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    @Override
    public String shorten(UrlRequest request, String baseUrl) {
        System.out.println(">>> shorten() called with baseUrl = " + baseUrl);

        String shortCode = generateUniqueCode();
        System.out.println(">>> generated code = " + shortCode);

        Url url = new Url();
        url.setOriginalUrl(request.getOriginalUrl());
        url.setShortCode(shortCode);
        urlRepository.save(url);

        String shortUrl = baseUrl.endsWith("/") ? baseUrl + shortCode : baseUrl + "/" + shortCode;
        System.out.println(">>> returning shortUrl = " + shortUrl);

        return shortUrl;
    }


    @Override
    @Transactional
    public Url getByShortCode(String shortCode) {
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new NotFoundException("Short URL not found"));
        url.setClickCount(url.getClickCount() + 1);
        return url;
    }

    private String generateUniqueCode() {
        StringBuilder sb = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            sb.append(ALPHABET.charAt(random.nextInt(ALPHABET.length())));
        }
        return sb.toString();
    }
}
