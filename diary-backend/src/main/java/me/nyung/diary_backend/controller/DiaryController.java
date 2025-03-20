package me.nyung.diary_backend.controller;

import me.nyung.diary_backend.entity.Diary;
import me.nyung.diary_backend.service.DiaryService;
import me.nyung.diary_backend.config.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
public class DiaryController {

    @Autowired
    DiaryService diaryService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // 쿠키에서 ACCESS_TOKEN 추출
    private String extractTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("ACCESS_TOKEN".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    // 다이어리 목록 조회
    @GetMapping("/home")
    public ResponseEntity<List<Diary>> getAllDiaries(HttpServletRequest request) {
        // String token = extractTokenFromCookies(request);
        // Integer userId = jwtTokenProvider.getUserIdFromToken(token);
        // System.out.println("토큰에서 추출한 user ID : ", userId);
        Integer user_id = 1;
        List<Diary> diaries = diaryService.getAllDiariesByUserId(user_id); 
        return ResponseEntity.ok(diaries);
    }

    // 다이어리 생성
    @PostMapping("/create")
    public ResponseEntity<Diary> createDiary(@RequestBody Diary diary, HttpServletRequest request) {
        String token = extractTokenFromCookies(request);
        Integer userId = jwtTokenProvider.getUserIdFromToken(token);
        diary.setUserId(userId);
        Diary newDiary = diaryService.createDiary(diary);
        return ResponseEntity.ok(newDiary);
    }

    // 다이어리 수정
    @PutMapping("/update/{id}")
    public ResponseEntity<Diary> updateDiary(@PathVariable int id, @RequestBody Diary diary, HttpServletRequest request) {
        String token = extractTokenFromCookies(request);
        Integer userId = jwtTokenProvider.getUserIdFromToken(token);

        // 수정하려는 다이어리가 본인 다이어리인지 확인
        Diary existingDiary = diaryService.getDiaryById(id);
        if (existingDiary == null || !existingDiary.getUserId().equals(userId)) {
            return ResponseEntity.status(403).build(); // Unauthorized
        }

        // 데이터의 무결성을 위해 id와 userId를 명시
        diary.setId(id);
        diary.setUserId(userId);
        Diary updatedDiary = diaryService.updateDiary(id, diary);
        return ResponseEntity.ok(updatedDiary);
    }

    // 다이어리 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDiary(@PathVariable int id, HttpServletRequest request) {
        String token = extractTokenFromCookies(request);
        Integer userId = jwtTokenProvider.getUserIdFromToken(token);

        // 삭제하려는 다이어리가 본인 다이어리인지 확인
        Diary existingDiary = diaryService.getDiaryById(id);
        if (existingDiary == null || !existingDiary.getUserId().equals(userId)) {
            return ResponseEntity.status(403).build(); // 권한 없음
        }

        diaryService.deleteDiary(id);
        return ResponseEntity.ok().build();
    }
}
