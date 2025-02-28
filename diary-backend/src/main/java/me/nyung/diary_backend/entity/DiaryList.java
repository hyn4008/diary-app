package me.nyung.diary_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.w3c.dom.Text;

import java.awt.*;
import java.math.BigInteger;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class DiaryList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "created_date", nullable = false)
    private BigInteger created_date;

    @Column(name = "emotion_id", nullable = false)
    private Integer emotion_id;

    @Column(name = "content", length = 500, nullable = false)
    private String content;
}
