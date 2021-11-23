package com.sustainability.controllers;

import com.sustainability.models.Survey;
import com.sustainability.models.SurveyQuestion;
import com.sustainability.repository.SurveyQuestionRepository;
import com.sustainability.repository.SurveyRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
public class SurveyQuestionController {

    @Autowired
    SurveyQuestionRepository surveyQuestionRepo;


    @GetMapping("/survey-question")
    public ResponseEntity<List<SurveyQuestion>> getSurveyQuestion() {

        List<SurveyQuestion> surveyQuestions = surveyQuestionRepo.findAll();

        return new ResponseEntity<>(surveyQuestions, HttpStatus.OK);
    }

    @GetMapping("/survey-question/{id}")
    public ResponseEntity<SurveyQuestion> getSurveyQuestions(@PathVariable("id") String id) {

        Optional<SurveyQuestion> surveyQuestions = surveyQuestionRepo.findById(id);

        if (surveyQuestions.isPresent()) {
            return new ResponseEntity<>(surveyQuestions.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/survey-question")
    @ResponseBody
    public ResponseEntity<SurveyQuestion> createSurveyQuestion(@RequestBody SurveyQuestion surveyQuestion) {

        SurveyQuestion newSurveyQuestion = surveyQuestionRepo.save(
                new SurveyQuestion(
                        null,
                        new ObjectId(String.valueOf(surveyQuestion.getSurveyId())),
                        surveyQuestion.getDescription(),
                        surveyQuestion.getCluster(),
                        surveyQuestion.getWeight()
                )
        );

        return new ResponseEntity<>(newSurveyQuestion, HttpStatus.OK);
    }

}


