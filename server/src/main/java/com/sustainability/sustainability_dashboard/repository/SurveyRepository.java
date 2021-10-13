package com.sustainability.sustainability_dashboard.repository;

import com.sustainability.sustainability_dashboard.model.Survey;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends MongoRepository<Survey, String> {

}