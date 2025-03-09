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
        Diary newDiary = diaryService.createDiary(diary);
        return newDiary;
    }

    @PutMapping("/update/{id}")
    public Diary updateDiary(@PathVariable int id, @RequestBody Diary diary) {
        Diary updateDiary = diaryService.updateDiary(id, diary);
        return updateDiary;
    }

    @DeleteMapping("/delete/{id}")
    public int deleteDiary(@PathVariable int id) {
        int deleteDiaryId = diaryService.deleteDiary(id);
        return deleteDiaryId;
    }
}
