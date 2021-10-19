package com.sustainability.payload.response;

public class SurveyResponse {
    private String id;
    private String title;
    private String pillar;
    private String [] scoringDescription;

    public SurveyResponse(String id, String title, String pillar, String [] scoringDescription) {
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

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPillar() {
        return pillar;
    }

    public void setPillar(String pillar) {
        this.pillar = pillar;
    }

    public String[] getScoringDescription() {
        return scoringDescription;
    }

    public void setScoringDescription(String[] scoringDescription) {
        this.scoringDescription = scoringDescription;
    }
}
