package com.sustainability.sustainability_dashboard;

import com.sustainability.sustainability_dashboard.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SustainabilityDashboardApplication {

	@Autowired
	ItemRepository groceryItemRepo;

	public static void main(String[] args) {
		SpringApplication.run(SustainabilityDashboardApplication.class, args);
	}

}
