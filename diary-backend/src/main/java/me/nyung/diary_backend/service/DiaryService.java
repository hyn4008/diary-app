package me.nyung.diary_backend.service;

import me.nyung.diary_backend.entity.Diary;
import me.nyung.diary_backend.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

    // user_id로 다이어리 조회
    public List<Diary> getAllDiariesByUserId(Integer user_id) {
        return diaryRepository.findByUser_id(user_id);
    }

    // 다이어리 생성
    public Diary createDiary(Diary diary) {
        return diaryRepository.save(diary);
    }

    // 다이어리 수정
    public Diary updateDiary(int id, Diary diary) {
        return diaryRepository.save(diary);
    }

    // 다이어리 삭제
    public void deleteDiary(int id) {
        diaryRepository.deleteById(id);
    }

    // ID로 다이어리 조회
    public Diary getDiaryById(int id) {
        return diaryRepository.findById(id).orElse(null);
    }
}
