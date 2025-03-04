import { useParams, useNavigate } from "react-router-dom";
import Header from "../componenets/Header";
import Viewer from "../componenets/Viewer";
import Button from "../componenets/Button";
import { useContext, useState, useEffect } from "react";
import useDiary from "../hooks/useDiary";
import { getStringDate } from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();
  const curDiaryItem = useDiary(params.id);
  usePageTitle(`${params.id}번 일기`);

  if (!curDiaryItem) {
    // component 호출 시 curDiaryItem은 undefined 상태
    return <div>데이터 로딩중...!</div>;
  }

  // component 마운트 후 useEffect 실행 -> setCurDiaryItem 호출
  // curDiaryItem 초기화 후 구조 분해 할당
  const { created_date, emotion_id, content } = curDiaryItem;
  const titleDate = getStringDate(new Date(created_date));

  return (
    <div>
      <Header
        title={`${titleDate} 기록`}
        leftChild={
          <Button
            text={"< 뒤로 가기"}
            onClick={() => {
              nav(-1);
            }}
          />
        }
        rightChild={
          <Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionId={emotion_id} content={content} />
    </div>
  );
};

export default Diary;
