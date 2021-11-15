package com.sustainability.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("surveys")
public class Survey {

    @Id
    private String id;
    private String title;
    private String pillar;
    private String[] scoringDescription;
    private boolean isActive = true;

    public Survey() {
    }
    
    public Survey(String id, String title, String pillar, String[] scoringDescription) {
        this.id = id;
        this.title = title;
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

    public void setActive(boolean active) {
        isActive = active;
    }

    public String[] getScoringDescription() {
        return scoringDescription;
    }

    public void setScoringDescription(String[] scoringDescription) {
        this.scoringDescription = scoringDescription;
    }
}