package com.sustainability.controllers;

import com.sustainability.models.SurveyResponse;
import com.sustainability.repository.SurveyResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
public class SurveyResponseController {

    @Autowired
    SurveyResponseRepository surveyResponseRepo;
    
    @GetMapping("/survey-question")
    public ResponseEntity<List<SurveyResponse>> getSurveyQuestion() {

        List<SurveyResponse> surveyResponses = surveyResponseRepo.findAll();

        return new ResponseEntity<>(surveyResponses, HttpStatus.OK);
    }

    @GetMapping("/survey-question/{id}")
    public ResponseEntity<SurveyResponse> getSurveyQuestions(@PathVariable("id") String id) {

        Optional<SurveyResponse> surveyResponse = surveyResponseRepo.findById(id);

        if (surveyResponse.isPresent()) {
            return new ResponseEntity<>(surveyResponse.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}