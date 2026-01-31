package com.deepak.shrinkify.service;

import com.deepak.shrinkify.dto.UrlRequest;
import com.deepak.shrinkify.exception.NotFoundException;
import com.deepak.shrinkify.model.Url;
import com.deepak.shrinkify.repository.UrlRepository;
import com.deepak.shrinkify.util.Base62Encoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
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
    public String shorten(UrlRequest request, String baseUrl) {
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
    public Url getByShortCode(String shortCode) {
        long id = Base62Encoder.decode(shortCode);
        Url url = urlRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Short URL not found"));
        url.setClickCount(url.getClickCount() + 1);
        return url;
    }

//    private String generateUniqueCode() {
//        StringBuilder sb = new StringBuilder(CODE_LENGTH);
//        for (int i = 0; i < CODE_LENGTH; i++) {
//            sb.append(ALPHABET.charAt(random.nextInt(ALPHABET.length())));
//        }
//        return sb.toString();
//    }
}
