package com.sustainability.sustainability_dashboard.controller;

import com.sustainability.sustainability_dashboard.model.Survey;
import com.sustainability.sustainability_dashboard.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class SurveyController {

    @Autowired
    SurveyRepository surveyRepo;


    @GetMapping("/survey")
    public ResponseEntity<List<Survey>> getSurvey() {

        List<Survey> surveys = surveyRepo.findAll();

        return new ResponseEntity<>(surveys, HttpStatus.OK);
    }

    @GetMapping("/survey/{id}")
    public ResponseEntity<Survey> getSurveys(@PathVariable("id") String id) {

        Optional<Survey> surveys = surveyRepo.findById(id);

        if (surveys.isPresent()) {
            return new ResponseEntity<>(surveys.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/survey")
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey) {

        Survey newSurvey = surveyRepo.save(new Survey(null, survey.getName(),survey.getPillar(),survey.getFaculty(),survey.getScoringDescription(), survey.getDateCreated()));

        return new ResponseEntity<>(newSurvey, HttpStatus.OK);
    }


}