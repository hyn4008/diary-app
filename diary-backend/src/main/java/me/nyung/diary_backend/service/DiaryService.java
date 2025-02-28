package me.nyung.diary_backend.service;

import me.nyung.diary_backend.entity.DiaryList;
import me.nyung.diary_backend.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaryService {

    @Autowired
    DiaryRepository diaryRepository;

    public List<DiaryList> getAllDiarys() {
        return diaryRepository.findAll();
    }
}
