package com.sustainability;

import com.sustainability.payload.request.LoginRequest;
import com.sustainability.payload.request.SignupRequest;
import com.sustainability.payload.response.JwtResponse;
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

import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @Author Saif Rashed
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TestAuthResource {

    @Autowired
    private TestRestTemplate restTemplate;


    @BeforeEach
    public void initEach() { // Create new dummy user
        // Arrange
        SignupRequest signupRequest = new SignupRequest();

        signupRequest.setUsername("testProfile");
        signupRequest.setEmail("testProfile@gmail.com");
        signupRequest.setFaculty("FACULTY OF BUSINESS AND ECONOMICS");
        signupRequest.setProgramme("AMSIB - INTERNATIONAL BUSINESS");
        signupRequest.setRole(new HashSet<>(Collections.singleton("ROLE_FACULTY")));
        signupRequest.setPassword("testProfile");

        // Act: Creating a user
        ResponseEntity<String> creationResult
                = this.restTemplate.postForEntity("/api/auth/signup", signupRequest, String.class);


        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.OK);
        assertTrue(Objects.requireNonNull(creationResult.getBody()).contains("User registered successfully!"));
    }

    @AfterEach
    public void cleanUpEach() { // delete registered user
        // Arrange
        LoginRequest loginRequest = new LoginRequest();

        loginRequest.setUsername("testProfile");
        loginRequest.setPassword("testProfile");

        // Act: sign a user in and delete
        ResponseEntity<JwtResponse> SignInResult
                = this.restTemplate.postForEntity("/api/auth/signin", loginRequest, JwtResponse.class);

        this.restTemplate.delete("/api/auth/users/" + Objects.requireNonNull(SignInResult.getBody()).getId());


        // Assert: Checking if the response is correct
        assertEquals(SignInResult.getStatusCode(), HttpStatus.OK);
        assertNotNull(SignInResult.getBody().getId());
        assertEquals(loginRequest.getUsername(), SignInResult.getBody().getUsername());
    }


    @Test
    void testSignInUserShouldSucceed() {

        // Arrange
        LoginRequest loginRequest = new LoginRequest();

        loginRequest.setUsername("testProfile");
        loginRequest.setPassword("testProfile");

        // Act: sign a user in
        ResponseEntity<JwtResponse> creationResult
                = this.restTemplate.postForEntity("/api/auth/signin", loginRequest, JwtResponse.class);

        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.OK);
        assertNotNull(creationResult.getBody().getId());
        assertEquals(loginRequest.getUsername(), creationResult.getBody().getUsername());
    }

    @Test
    void testUsernameShouldBeUnique() {
        // Arrange
        SignupRequest signupRequest = new SignupRequest();

        signupRequest.setUsername("testProfile");
        signupRequest.setEmail("testProfile@gmail.com");
        signupRequest.setFaculty("FACULTY OF BUSINESS AND ECONOMICS");
        signupRequest.setProgramme("AMSIB - INTERNATIONAL BUSINESS");
        signupRequest.setRole(new HashSet<>(Collections.singleton("ROLE_FACULTY")));
        signupRequest.setPassword("testProfile");

        // Act: Creating a user
        ResponseEntity<String> creationResult
                = this.restTemplate.postForEntity("/api/auth/signup", signupRequest, String.class);


        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.BAD_REQUEST);
        assertTrue(Objects.requireNonNull(creationResult.getBody()).contains("Error: Username is already taken!"));
    }

    @Test
    void testRoleShouldBeCorrect() {

        // Arrange
        LoginRequest loginRequest = new LoginRequest();

        loginRequest.setUsername("testProfile");
        loginRequest.setPassword("testProfile");

        // Act: sign a user in
        ResponseEntity<JwtResponse> creationResult
                = this.restTemplate.postForEntity("/api/auth/signin", loginRequest, JwtResponse.class);

        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.OK);
        assertEquals("ROLE_FACULTY", creationResult.getBody().getRoles().get(0));
        assertEquals(loginRequest.getUsername(), creationResult.getBody().getUsername());
    }

    @Test
    void testEmailShouldBeUnique() {
        // Arrange
        SignupRequest signupRequest = new SignupRequest();

        signupRequest.setUsername("testProfileNew");
        signupRequest.setEmail("testProfile@gmail.com");
        signupRequest.setFaculty("FACULTY OF BUSINESS AND ECONOMICS");
        signupRequest.setProgramme("AMSIB - INTERNATIONAL BUSINESS");
        signupRequest.setRole(new HashSet<>(Collections.singleton("ROLE_FACULTY")));
        signupRequest.setPassword("testProfile");

        // Act: Creating a user
        ResponseEntity<String> creationResult
                = this.restTemplate.postForEntity("/api/auth/signup", signupRequest, String.class);


        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.BAD_REQUEST);
        assertTrue(Objects.requireNonNull(creationResult.getBody()).contains("Error: Email is already in use!"));
    }


    @Test
    void testUsernameShouldBeExtractedFromJWT() {
        // Arrange
        LoginRequest loginRequest = new LoginRequest();

        loginRequest.setUsername("testProfile");
        loginRequest.setPassword("testProfile");

        // Act: sign a user in
        ResponseEntity<JwtResponse> creationResult
                = this.restTemplate.postForEntity("/api/auth/signin", loginRequest, JwtResponse.class);

        // Assert: Checking if the response is correct
        assertEquals(HttpStatus.OK, creationResult.getStatusCode());
        assertNotNull(creationResult.getBody().getId());
        assertEquals(loginRequest.getUsername(), creationResult.getBody().getUsername());

        /** Get JWT token **/


        // Arrange
        String jwt = creationResult.getBody().getAccessToken();


        // Act: authenticate with given JWT
        String jwtResult = this.restTemplate.getForObject("/api/auth/authenticate?id=" + jwt, String.class);

        // Assert: Checking if the response is correct
        assertEquals(creationResult.getStatusCode(), HttpStatus.OK);
        assertTrue(jwtResult.contains(creationResult.getBody().getId()));
        assertTrue(jwtResult.contains(creationResult.getBody().getUsername()));
        assertTrue(jwtResult.contains(creationResult.getBody().getEmail()));
        assertTrue(jwtResult.contains(creationResult.getBody().getFaculty()));
        assertTrue(jwtResult.contains(creationResult.getBody().getProgramme()));
    }
}
