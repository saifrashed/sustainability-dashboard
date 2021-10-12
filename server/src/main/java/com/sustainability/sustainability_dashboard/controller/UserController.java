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

    @Autowired
    UserRepository userRepo;


    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsers() {

        List<User> users = userRepo.findAll();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUsers(@PathVariable("id") String id) {

        Optional<User> users = userRepo.findById(id);

        if (users.isPresent()) {
            return new ResponseEntity<>(users.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User newUser = userRepo.save(new User(null, user.getEmail(), user.getPassword(), user.getFirstName(), user.getLastName(), user.getRole(), user.getToken()));

        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }


}