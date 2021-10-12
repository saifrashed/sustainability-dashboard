package com.sustainability.sustainability_dashboard.repository;


import com.sustainability.sustainability_dashboard.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {


}