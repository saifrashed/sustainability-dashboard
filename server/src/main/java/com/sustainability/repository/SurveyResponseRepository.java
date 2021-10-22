package com.sustainability.repository;


import com.sustainability.models.SurveyResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyResponseRepository extends MongoRepository<SurveyResponse, String> {

}