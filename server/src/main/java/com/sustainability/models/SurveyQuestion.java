package com.sustainability.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("surveyQuestions")
public class SurveyQuestion {


    @Id
    private String id;
    private ObjectId surveyId;
    private String description;
    private String cluster;
    private int weight = 1;

    public SurveyQuestion() {
    }

    public SurveyQuestion(String id, ObjectId surveyId, String description, String cluster, int weight) {
        this.id = id;
        this.surveyId = surveyId;
        this.description = description;
        this.cluster = cluster;
        this.weight = weight;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ObjectId getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(ObjectId surveyId) {
        this.surveyId = surveyId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String name) {
        this.description = name;
    }

    public String getCluster() {
        return cluster;
    }

    public void setCluster(String cluster) {
        this.cluster = cluster;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}