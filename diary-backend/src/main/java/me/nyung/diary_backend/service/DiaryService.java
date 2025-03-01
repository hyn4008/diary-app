package me.nyung.diary_backend.service;

import jakarta.transaction.Transactional;
import me.nyung.diary_backend.entity.Diary;
import me.nyung.diary_backend.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiaryService {

    @Autowired
    DiaryRepository diaryRepository;

    public List<Diary> getAllDiarys() {
        return diaryRepository.findAll();
    }

    public Diary createDiary(Diary diary) {
        return diaryRepository.save(diary);
    }

    @Transactional
    public Diary updateDiary(int id, Diary diary) {
        Optional<Diary> optionalDiary = diaryRepository.findById(id);
        Diary targetDiary = optionalDiary.orElseThrow(() -> new RuntimeException("Diary not found"));

        targetDiary.setCreatedDate(diary.getCreatedDate());
        targetDiary.setEmotionId(diary.getEmotionId());
        targetDiary.setContent(diary.getContent());

        return targetDiary;
    }

    @Transactional
    public int deleteDiary(int id) {
        Optional<Diary> optionalDiary = diaryRepository.findById(id);
        Diary targetDiary = optionalDiary.orElseThrow(() -> new RuntimeException("Diary not found"));
        diaryRepository.deleteById(id);

        return id;
    }
}
