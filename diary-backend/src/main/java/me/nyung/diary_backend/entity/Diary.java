package me.nyung.diary_backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigInteger;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "diary_list")
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @JsonProperty("created_date")
    @Column(name = "created_date", nullable = false)
    private BigInteger created_date;

    @JsonProperty("emotion_id")
    @Column(name = "emotion_id", nullable = false)
    private Integer emotion_id;

    @Column(name = "content", length = 500, nullable = false)
    private String content;

    @Column(name = "user_id")
    private Integer user_id;

    // Getter
    public Integer getId() {
        return id;
    }

    public BigInteger getCreatedDate() {
        return created_date;
    }

    public Integer getEmotionId() {
        return emotion_id;
    }

    public String getContent() {
        return content;
    }

    public Integer getUserId() {
        return user_id;
    }

    // Setter
    public void setId(Integer id) {
        this.id = id;
    }

    public void setCreatedDate(BigInteger created_date) {
        this.created_date = created_date;
    }

    public void setEmotionId(Integer emotion_id) {
        this.emotion_id = emotion_id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setUserId(Integer user_id) {
        this.user_id = user_id;
    }
}
