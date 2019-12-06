package com.example.backend.controller;

import com.example.backend.dto.UserDTO;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("login")
@CrossOrigin
public class LoginController {
    @Autowired
    private UserService userService;

    @GetMapping
    public UserDTO loginUser(@RequestParam String name) {
        return userService.loginUser(name);
    }
}
