package me.nyung.diary_backend.controller;

import me.nyung.diary_backend.entity.User;
import me.nyung.diary_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        User newUser = userService.saveUser(requestUser);
        return newUser;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User requestUser = userService.findByUsername(user.getUsername());
        if (requestUser != null && requestUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}