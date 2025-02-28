import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    // useEffect 훅을 사용해야 하는 이유?
    // -> navigate 함수는 모든 컴포넌트가 렌더링(마운트)된 이후에 사용할 수 있음
    // -> 즉, 컴포넌트 실행 시에는 사용할 수 없음 (아직 return하기 전에는 ..)
    // 원래는 getCurrentDiaryItem()이라는 함수를 처음에 호출하여 값을 받아오려고 했으나
    // 위와 같은 이유로 에러 발생

    // -> 예외로 이벤트 핸들러 내에서는 navigate 함수 호출 가능
    // -> 컴포넌트가 렌더링된 후 이벤트가 발생했을 때(ex.삭제 버튼 클릭) 실행되기 때문

    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      nav("/", { replace: true });
    } else {
      setCurDiaryItem(currentDiaryItem);
    }
  }, [id, data]);

  return curDiaryItem;
};

export default useDiary;
