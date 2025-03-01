import Header from "../componenets/Header";
import Button from "../componenets/Button";
import { useNavigate } from "react-router-dom";
import Editor from "../componenets/Editor";
import { useContext, useEffect } from "react";
import { DiarySetContext } from "../App";
import Diary from "./Diary";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
  const { onCreate } = useContext(DiarySetContext);
  const nav = useNavigate();
  usePageTitle("새 일기 쓰기");

  const onSubmit = (input) => {
    onCreate(input.created_date.getTime(), input.emotion_id, input.content);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text={"< 뒤로 가기"}
          />
        }
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
