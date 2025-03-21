package me.nyung.diary_backend.repository;

import me.nyung.diary_backend.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Integer> {
    // userId로 다이어리 조회
    List<Diary> findByUserId(Integer userId);
}
