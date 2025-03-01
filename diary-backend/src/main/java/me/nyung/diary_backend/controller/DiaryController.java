package me.nyung.diary_backend.controller;

import me.nyung.diary_backend.entity.Diary;
import me.nyung.diary_backend.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DiaryController {

    @Autowired
    DiaryService diaryService;

    @GetMapping("/home")
    public List<Diary> gettAllDiarys() {
        List<Diary> diarys = diaryService.getAllDiarys();
        return diarys;
    }

    @PostMapping("/create")
    public Diary createDiary(@RequestBody Diary diary) {
        Diary requestDiary = new Diary();
        requestDiary.setCreatedDate(diary.getCreatedDate());
        requestDiary.setEmotionId(diary.getEmotionId());
        requestDiary.setContent(diary.getContent());

        Diary newDiary = diaryService.createDiary(requestDiary);
        return newDiary;
    }

    @PutMapping("/update/{id}")
    public Diary updateDiary(@PathVariable int id, @RequestBody Diary diary) {
        Diary requestDiary = new Diary();
        requestDiary.setCreatedDate(diary.getCreatedDate());
        requestDiary.setEmotionId(diary.getEmotionId());
        requestDiary.setContent(diary.getContent());

        Diary updateDiary = diaryService.updateDiary(id, requestDiary);
        return updateDiary;
    }

    @DeleteMapping("/delete/{id}")
    public int deleteDiary(@PathVariable int id) {
        int deleteId = diaryService.deleteDiary(id);
        return deleteId;
    }
}
