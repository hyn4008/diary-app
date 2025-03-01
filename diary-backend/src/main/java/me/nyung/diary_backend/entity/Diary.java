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
@Table(name = "diary_list")
public class Diary {
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

    public Integer getId() {
        return id;
    }

    public BigInteger getCreatedDate() {
        return created_date;
    }

    public void setCreatedDate(BigInteger created_date) {
        this.created_date = created_date;
    }

    public Integer getEmotionId() {
        return emotion_id;
    }

    public void setEmotionId(Integer emotion_id) {
        this.emotion_id = emotion_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
