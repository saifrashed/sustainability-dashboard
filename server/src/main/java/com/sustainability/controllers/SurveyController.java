package com.sustainability.controllers;

import com.sustainability.models.SurveyQuestion;
import com.sustainability.repository.SurveyQuestionRepository;
import com.sustainability.repository.SurveyRepository;
import com.sustainability.models.Survey;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/public")
public class SurveyController {

    @Autowired
    SurveyRepository surveyRepo;

    @Autowired
    SurveyQuestionRepository surveyQuestionRepo;

    @Autowired
    MongoTemplate mongoTemplate;


    @GetMapping("/survey")
    public ResponseEntity<List<Survey>> getSurveys() {
        //aggregation to check if survey is active
        Aggregation aggregate = newAggregation(match(new Criteria("isActive").is(true)));

        //aggregation to mongoTemplate
        AggregationResults<Survey> groupResults = mongoTemplate.aggregate(aggregate, "surveys", Survey.class);

        //convert the aggregation to a List<Survey>
        List<Survey> result = groupResults.getMappedResults();

        //return result
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/survey/{id}")
    public ResponseEntity<Survey> getSurvey(@PathVariable("id") String id) {
        //find survey by id
        Optional<Survey> surveys = surveyRepo.findById(id);

        //if survey is present, get survey else return not found
        if (surveys.isPresent()) {
            return new ResponseEntity<>(surveys.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/survey/reopen/{id}")
    public ResponseEntity<Survey> reopenSurvey(@PathVariable("id") String id) {
        // set current survey inactive
        Optional<Survey> survey = surveyRepo.findById(id);

        Survey object = survey.get();
        object.setActive(false);
        surveyRepo.save(object);

        // new survey document
        Survey newSurvey = surveyRepo.save(new Survey(null, object.getTitle(), object.getPillar(), object.getScoringDescription()));

        // copy questions over to new survey document
        Aggregation aggregate;
        aggregate = newAggregation(match(new Criteria("surveyId").is(new ObjectId(id))));

        AggregationResults<SurveyQuestion> groupResults = mongoTemplate.aggregate(aggregate, "surveyQuestions", SurveyQuestion.class);
        List<SurveyQuestion> result = groupResults.getMappedResults();

        result.forEach(surveyQuestion -> {
            System.out.println(surveyQuestion.getDescription());
            System.out.println(newSurvey.getId());
            SurveyQuestion newSurveyQuestion = surveyQuestionRepo.save(new SurveyQuestion(null, new ObjectId(String.valueOf(newSurvey.getId())), surveyQuestion.getDescription(), surveyQuestion.getCluster(), surveyQuestion.getWeight()));
        });

        //if survey is present get survey, else return not found
        if (survey.isPresent()) {
            return new ResponseEntity<>(survey.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/survey")
    public ResponseEntity<Survey> deleteSurvey(@RequestParam(required = true) String id) {

        Optional<Survey> survey = surveyRepo.findById(id);
        Survey object = survey.get();
        object.setActive(false);
        surveyRepo.save(object);

        return new ResponseEntity<>(object, HttpStatus.OK);
    }

    ;


    @PostMapping("/survey")
    @ResponseBody
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey) {

        Survey newSurvey = surveyRepo.save(new Survey(null, survey.getTitle(), survey.getPillar(), survey.getScoringDescription()));

        return new ResponseEntity<>(newSurvey, HttpStatus.OK);
    }


    @GetMapping("/survey/questions/{id}")
    public ResponseEntity<List<SurveyQuestion>> getSurveyQuestions(@PathVariable("id") String id) {

        Aggregation aggregate;
        aggregate = newAggregation(match(new Criteria("surveyId").is(new ObjectId(id))));

        AggregationResults<SurveyQuestion> groupResults = mongoTemplate.aggregate(aggregate, "surveyQuestions", SurveyQuestion.class);
        List<SurveyQuestion> result = groupResults.getMappedResults();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}