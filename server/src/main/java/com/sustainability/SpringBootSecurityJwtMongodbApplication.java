package com.sustainability;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class SpringBootSecurityJwtMongodbApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootSecurityJwtMongodbApplication.class, args);
    }
}
