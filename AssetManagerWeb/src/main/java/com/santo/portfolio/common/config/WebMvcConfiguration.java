package com.santo.portfolio.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.santo.portfolio.common.IConstant;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

	private static final String DEFAULT_PATH = "/";

	@Override
	public void addViewControllers(final ViewControllerRegistry registry) {
		registry.addRedirectViewController(DEFAULT_PATH, IConstant.DASHBOARD);
	}
}
