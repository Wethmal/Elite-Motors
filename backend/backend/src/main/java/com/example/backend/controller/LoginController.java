package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class LoginController {


    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Map<String, String> response = new HashMap<>();

       
        if ("admin".equals(username) && "123".equals(password)) {
            response.put("message", "success");
            response.put("status", "ok");
        } else {
            response.put("message", "fail");
            response.put("status", "error");
        }
        return response;
    }
}