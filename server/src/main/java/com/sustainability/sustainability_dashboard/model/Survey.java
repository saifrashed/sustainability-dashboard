package com.sustainability.sustainability_dashboard.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Date;

@Document("surveys")
public class Survey {

    @Id
    private String id;
    private String title;
    private String pillar;
    private String [] scoringDescription;

    public Survey(String id, String name, String pillar, String [] scoringDescription) {
        this.id = id;
        this.title = name;
        this.pillar = pillar;
        this.scoringDescription = scoringDescription;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String name) {
        this.title = name;
    }

    public String getPillar() {
        return pillar;
    }

    public void setPillar(String pillar) {
        this.pillar = pillar;
    }


    public String [] getScoringDescription() {
        return scoringDescription;
    }

    public void setScoringDescription(String [] scoringDescription) {
        this.scoringDescription = scoringDescription;
    }
}