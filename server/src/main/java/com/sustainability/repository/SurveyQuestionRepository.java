package com.sustainability.repository;

import com.sustainability.models.Survey;
import com.sustainability.models.SurveyQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyQuestionRepository extends MongoRepository<SurveyQuestion, String> {

}