package me.nyung.diary_backend.repository;

import me.nyung.diary_backend.entity.DiaryList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends JpaRepository<DiaryList, Integer> {
}
