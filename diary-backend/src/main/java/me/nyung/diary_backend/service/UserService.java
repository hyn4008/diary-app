package me.nyung.diary_backend.service;

import me.nyung.diary_backend.entity.User;
import me.nyung.diary_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByKakaoId(BigInteger kakaoId) {
        return userRepository.findByKakaoId(kakaoId);
    }

    public boolean checkPassword(User user, String rawPassword) {
        return rawPassword.equals(user.getPassword());
    }
}