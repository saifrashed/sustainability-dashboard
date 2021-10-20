package com.sustainability.controllers;

import com.sustainability.models.SurveyQuestion;
import com.sustainability.models.SurveyResponse;
import com.sustainability.repository.SurveyResponseRepository;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;

@RestController
@RequestMapping("/api/public")
public class SurveyResponseController {

    @Autowired
    SurveyResponseRepository surveyResponseRepo;

    @Autowired
    MongoTemplate mongoTemplate;


    @GetMapping("/survey-response")
    public ResponseEntity<List<Document>> getSurveyResponse() {


        LookupOperation lookupUserOperation = LookupOperation.newLookup().
                from("users").
                localField("userId").
                foreignField("_id").
                as("user");

        LookupOperation lookupSurveyOperation = LookupOperation.newLookup().
                from("surveys").
                localField("surveyId").
                foreignField("_id").
                as("survey");


        Aggregation aggregation = Aggregation.newAggregation(lookupUserOperation, lookupSurveyOperation, Aggregation.unwind("scoring"), Aggregation.unwind("user"), Aggregation.unwind("survey"));


        AggregationResults<Document> surveyResponse = mongoTemplate.aggregate(aggregation, "surveyResponse", Document.class);;

        List<Document> result = surveyResponse.getMappedResults();


        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/survey-response/statistics/global")
    public ResponseEntity<List<Document>> getSurveyResponseStatisticsGlobals() {


        // get user document
        LookupOperation lookupUserOperation = LookupOperation.newLookup().
                from("users").
                localField("userId").
                foreignField("_id").
                as("user");

        // get survey document
        LookupOperation lookupSurveyOperation = LookupOperation.newLookup().
                from("surveys").
                localField("surveyId").
                foreignField("_id").
                as("survey");

        // multiply value by weight
        ArithmeticOperators.Multiply multiplyOp = ArithmeticOperators
                .valueOf("$scoring.value").multiplyBy("$scoring.weight");

        // group the documents by pillars
        GroupOperation groupByPillar = group("survey.pillar").sum(multiplyOp).as("numerator").sum("scoring.weight").as("denominator");

        // calculate average by dividing sum value by sum weights
        ArithmeticOperators.Divide divideOp = ArithmeticOperators.valueOf("$numerator")
                .divideBy("$denominator");

        // project the calculation as average
        ProjectionOperation projectOperation = project().and(divideOp).as("average");

        // prepare aggregation
        Aggregation aggregation = Aggregation.newAggregation(
                lookupUserOperation,
                lookupSurveyOperation,
                Aggregation.unwind("scoring"),
                Aggregation.unwind("user"),
                Aggregation.unwind("survey"),
                groupByPillar,
                projectOperation
        );

        // initialise aggregation
        AggregationResults<Document> surveyResponse = mongoTemplate.aggregate(aggregation, "surveyResponse", Document.class);;

        // map results
        List<Document> result = surveyResponse.getMappedResults();


        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping("/survey-response/statistics/{faculty}")
    public ResponseEntity<List<Document>> getSurveyResponseStatisticsByFaculty(@PathVariable("faculty") String faculty) {

        // get user document
        LookupOperation lookupUserOperation = LookupOperation.newLookup().
                from("users").
                localField("userId").
                foreignField("_id").
                as("user");

        // get survey document
        LookupOperation lookupSurveyOperation = LookupOperation.newLookup().
                from("surveys").
                localField("surveyId").
                foreignField("_id").
                as("survey");

        // match the faculty
        MatchOperation matchFaculty = Aggregation.match(Criteria.where("user.faculty")
                        .is(faculty));

        // multiply value by weight
        ArithmeticOperators.Multiply multiplyOp = ArithmeticOperators
                .valueOf("$scoring.value").multiplyBy("$scoring.weight");

        // group the documents by pillars
        GroupOperation groupByPillar = group("survey.pillar").sum(multiplyOp).as("numerator").sum("scoring.weight").as("denominator");

        // calculate average by dividing sum value by sum weights
        ArithmeticOperators.Divide divideOp = ArithmeticOperators.valueOf("$numerator")
                .divideBy("$denominator");

        // project the calculation as average
        ProjectionOperation projectOperation = project().and(divideOp).as("average");

        // prepare aggregation
        Aggregation aggregation = Aggregation.newAggregation(
                lookupUserOperation,
                lookupSurveyOperation,
                Aggregation.unwind("scoring"),
                Aggregation.unwind("user"),
                Aggregation.unwind("survey"),
                matchFaculty,
                groupByPillar,
                projectOperation
        );

        // initialise aggregation
        AggregationResults<Document> surveyResponse = mongoTemplate.aggregate(aggregation, "surveyResponse", Document.class);;

        // map results
        List<Document> result = surveyResponse.getMappedResults();


        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping("/survey-response")
    @ResponseBody
    public ResponseEntity<SurveyResponse> createSurveyQuestion(@RequestBody SurveyResponse surveyResponse) {

        SurveyResponse newSurveyQuestion = surveyResponseRepo.save(surveyResponse);

        return new ResponseEntity<>(newSurveyQuestion, HttpStatus.OK);
    }

}