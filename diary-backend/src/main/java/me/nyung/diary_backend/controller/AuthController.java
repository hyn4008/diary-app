package me.nyung.diary_backend.controller;

import me.nyung.diary_backend.entity.User;
import me.nyung.diary_backend.service.UserService;
import me.nyung.diary_backend.config.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        User newUser = userService.saveUser(user);
        return newUser;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User requestUser = userService.findByUsername(user.getUsername());
        if (requestUser != null && userService.checkPassword(requestUser, user.getPassword())) {
            String token = jwtTokenProvider.generateToken(user.getUsername());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}