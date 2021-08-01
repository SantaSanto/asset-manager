package com.santo.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AssetManagerWebApp {

	public static void main(String[] args) {
		SpringApplication.run(AssetManagerWebApp.class, args);
	}

}
