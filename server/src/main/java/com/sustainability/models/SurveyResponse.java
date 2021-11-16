package com.sustainability.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class SurveyResponse {

    @Id
    private String id;

    @Indexed
    private ObjectId userId;

    @Indexed
    private ObjectId surveyId;

    @CreatedDate
    private LocalDateTime responseDate = LocalDateTime.now();
    private Object[] scoring;

    public SurveyResponse() {
    }

    public SurveyResponse(ObjectId userId, ObjectId surveyId, LocalDateTime responseDate, Object[] scoring) {
        this.userId = userId;
        this.surveyId = surveyId;
        this.responseDate = responseDate;
        this.scoring = scoring;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }

    public ObjectId getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(ObjectId surveyId) {
        this.surveyId = surveyId;
    }

    public LocalDateTime getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(LocalDateTime responseDate) {
        this.responseDate = responseDate;
    }

    public Object[] getScoring() {
        return scoring;
    }

    public void setScoring(Object[] scoring) {
        this.scoring = scoring;
    }
}