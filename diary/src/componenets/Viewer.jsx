import "./Viewer.css";
import { getEmotionImage } from "../util/get-emotion-image";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { emotionList } from "../util/constants";
import useDiary from "../hooks/useDiary";

const Viewer = ({ emotionId, content }) => {
  const params = useParams();
  const curDiaryItem = useDiary(params.id);

  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );

  return (
    <div className="Viewer">
      <section className="emotion_section">
        <h3>오늘의 감정</h3>
        <div className={`emoiton_wrapper emotion_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)} />
          <div>{emotionItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h3>오늘의 일기</h3>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
