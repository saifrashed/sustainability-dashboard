package com.sustainability.sustainability_dashboard.controller;

import com.sustainability.sustainability_dashboard.model.User;
import com.sustainability.sustainability_dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {


    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsers() {

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUsers(@PathVariable("id") String id) {

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        return new ResponseEntity<>(null, HttpStatus.OK);
    }


}