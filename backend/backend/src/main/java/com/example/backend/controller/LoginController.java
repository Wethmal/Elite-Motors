package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth") // Base URL for authentication endpoints
@CrossOrigin("*") // Allows requests from the frontend (React)
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    // 1. Endpoint for User Login
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Map<String, String> response = new HashMap<>();

        // Check if the user exists in the database by username
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Check if the provided password matches the stored password
            if (user.getPassword().equals(password)) {
                response.put("message", "Login Successful");
                response.put("status", "ok");
                response.put("role", user.getRole());
            } else {
                response.put("message", "Invalid Password");
                response.put("status", "error");
            }
        } else {
            response.put("message", "User not found");
            response.put("status", "error");
        }

        return response;
    }

    // 2. Endpoint to Register a new Admin (Use this once to create the first admin)
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // Saves the new user/admin to the database
        return userRepository.save(user);
    }
}