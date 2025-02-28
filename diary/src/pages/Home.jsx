// import { useSearchParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import Header from "../componenets/Header";
import Button from "../componenets/Button";
import DiaryList from "../componenets/DiaryList";
import usePageTitle from "../hooks/usePageTitle";

const getMontlyData = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();
  // 0일 -> 지난 달의 마지막 날짜
  return data.filter(
    (item) => item.created_date >= beginTime && item.created_date <= endTime
  );
};

const Home = () => {
  // const [params, setParams] = useSearchParams();
  // console.log(params.get("value"));

  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = getMontlyData(pivotDate, data);
  usePageTitle("감정 일기장");

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
