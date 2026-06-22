package com.Suman.Employee_Directory.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow cross-origin requests to all endpoints. In production you should
        // restrict allowedOrigins to the specific frontend origin(s) instead of "*".
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                // When using allowedOrigins("*"), credentials are not allowed.
                .allowCredentials(false)
                .maxAge(3600);
    }
}

