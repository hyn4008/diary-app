package me.nyung.diary_backend.controller;

import me.nyung.diary_backend.entity.DiaryList;
import me.nyung.diary_backend.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DiaryController {

    @Autowired
    DiaryService diaryService;

    @GetMapping("/home")
    public List<DiaryList> gettAllDiarys() {
        List<DiaryList> diarys = diaryService.getAllDiarys();
        return diarys;
    }
}
