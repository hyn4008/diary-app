import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotion_id, created_date, content }) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div
        onClick={() => {
          nav(`/diary/${id}`);
        }}
        className={`img_section img_section_${emotion_id}`}
      >
        <img src={getEmotionImage(emotion_id)} />
      </div>
      <div
        onClick={() => {
          nav(`/diary/${id}`);
        }}
        className="info_section"
      >
        <div className="created_date">
          {new Date(created_date).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button
          onClick={() => {
            nav(`/edit/${id}`);
          }}
          text={"수정하기"}
        />
      </div>
    </div>
  );
};

export default DiaryItem;
