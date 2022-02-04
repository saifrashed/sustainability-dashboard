package com.sustainability;

import com.sustainability.models.Survey;
import com.sustainability.models.SurveyQuestion;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @Author Callum Svadkovski
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TestSurveyResource {

    @Autowired
    private TestRestTemplate restTemplate;

    private String dummySurveyId = "";
    private List<SurveyQuestion> dummyQuestions = new ArrayList<>();

    @BeforeEach
    public void initEach() { // Create new dummy user
        // Arrange: setting up dummy data
        String[] scoringDescription = {"first", "second", "third", "fourth", "fifth", "sixth"};

        Survey testSurvey = new Survey(null, "testSurvey", "Education", scoringDescription);

        dummyQuestions.add(new SurveyQuestion(null, null, "question one", "random cluster", 1));
        dummyQuestions.add(new SurveyQuestion(null, null, "question two", "random cluster", 1));
        dummyQuestions.add(new SurveyQuestion(null, null, "question three", "random cluster", 1));

        // Act: Creating a dummy survey and inserting questions
        ResponseEntity<Survey> surveyCreation
                = this.restTemplate.postForEntity("/api/public/survey", testSurvey, Survey.class);

        this.dummySurveyId = surveyCreation.getBody().getId();

        for (SurveyQuestion question : dummyQuestions) {
            question.setSurveyId(new ObjectId(String.valueOf(surveyCreation.getBody().getId())));
            ResponseEntity<SurveyQuestion> result = this.restTemplate.postForEntity("/api/public/survey-question", question, SurveyQuestion.class);
            question.setId(result.getBody().getId());
        }

        // Assert: Checking if the response is correct
        assertEquals(surveyCreation.getStatusCode(), HttpStatus.OK);
        assertNotNull(surveyCreation.getBody());
    }

    @AfterEach
    public void cleanUpEach() {
        this.restTemplate.delete("/api/public/survey?id=" + dummySurveyId, Survey.class);

        this.dummySurveyId = "";

        for (SurveyQuestion question : dummyQuestions) {
            this.restTemplate.delete("/api/public/survey-question?id=" + question.getId(), SurveyQuestion.class);
        }
    }


    @Test
    void testShouldGetAllSurveys() {
        // Arrange
        ResponseEntity<Survey[]> surveyResult;

        // Act: Get all surveys
        surveyResult = this.restTemplate.getForEntity("/api/public/survey", Survey[].class);

        // Assert
        assertNotNull(surveyResult.getBody());
        assertEquals(surveyResult.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void testShouldGetSingleSurvey() {
        // Arrange
        ResponseEntity<Survey> surveyResult;

        // Act: Get a single survey
        surveyResult = this.restTemplate.getForEntity("/api/public/survey/" + dummySurveyId, Survey.class);

        // Assert
        assertNotNull(surveyResult.getBody());
        assertEquals(surveyResult.getStatusCode(), HttpStatus.OK);
        assertEquals(surveyResult.getBody().getTitle(), "testSurvey");
    }


    @Test
    void testShouldGetSingleQuestion() {
        // Arrange
        String questionId = dummyQuestions.get(0).getId();
        ResponseEntity<SurveyQuestion> questionResult;

        // Act
        questionResult = this.restTemplate.getForEntity("/api/public/survey-question/" + questionId, SurveyQuestion.class);

        // Assert
        assertNotNull(questionResult.getBody());
        assertEquals(questionResult.getStatusCode(), HttpStatus.OK);
        assertEquals(questionResult.getBody().getDescription(), "question one");
    }

    @Test
    void testShouldGetAllQuestions() {
        // Arrange
        ResponseEntity<SurveyQuestion[]> questionResults;

        // Act
        questionResults = this.restTemplate.getForEntity("/api/public/survey/questions/" + dummySurveyId, SurveyQuestion[].class);

        // Assert
        assertNotNull(questionResults.getBody());
        assertEquals(questionResults.getStatusCode(), HttpStatus.OK);
        assertEquals(questionResults.getBody().length, 3);
    }

    @Test
    void testShouldDeleteQuestion() {
        // Arrange
        ResponseEntity<SurveyQuestion> questionResult;

        // Act
        this.restTemplate.delete("/api/public/survey-question?id=" + dummyQuestions.get(0).getId(), SurveyQuestion.class);

        questionResult = this.restTemplate.getForEntity("/api/public/survey-question/" + dummyQuestions.get(0).getId(), SurveyQuestion.class);

        dummyQuestions.remove(0);

        // Assert
        assertNull(questionResult.getBody());
        assertEquals(questionResult.getStatusCode(), HttpStatus.NOT_FOUND);
    }
}