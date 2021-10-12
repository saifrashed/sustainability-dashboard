package com.sustainability.sustainability_dashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Date;

@Document("surveys")
public class Survey {

    @Id
    private String id;
    private String name;
    private String pillar;
    private String faculty;
    private String[] scoringDescription;
    private Date dateCreated;

    public Survey(String id, String name, Date dateCreated, String pillar, String faculty, String[] scoringDescription) {
        super();
        this.id = id;
        this.name = name;
        this.dateCreated = dateCreated;
        this.pillar = pillar;
        this.faculty = faculty;
        this.scoringDescription = scoringDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getPillar() {
        return pillar;
    }

    public void setPillar(String pillar) {
        this.pillar = pillar;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String[] getScoringDescription() {
        return scoringDescription;
    }

    public void setScoringDescription(String[] scoringDescription) {
        this.scoringDescription = scoringDescription;
    }
}