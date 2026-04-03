package com.deepak.shrinkify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class ShrinkifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShrinkifyApplication.class, args);
	}

}
