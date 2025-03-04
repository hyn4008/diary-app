import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import { getEmotionImage } from "./util/get-emotion-image";
import Button from "./componenets/Button";
import Header from "./componenets/Header";
import axios from "axios";

export const DiaryStateContext = createContext();
export const DiarySetContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [diarys, setDiarys] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/home");
        setDiarys(res.data);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다.', error);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  const onCreate = async (created_date, emotion_id, content) => {
    try {
      const res = await axios.post("http://localhost:8080/create", {
            created_date,
            emotion_id,
        content,
      });
      setDiarys([res.data, ...diarys]);
    } catch(error) {
      alert('일기를 등록하는 데에 실패했습니다. 다시 시도해주세요');
      console.error('일기를 등록하지 못했습니다. 다시 시도해주세요', error);
    }
  };

  const onUpdate = async (id, created_date, emotion_id, content) => {
    try {
      const res = await axios.put(`http://localhost:8080/update/${id}`, {
          created_date,
          emotion_id,
        content,
      });
      setDiarys(diarys.map((diary) => (diary.id === res.data.id ? res.data : diary)));
      } catch(error) {
      alert('일기를 수정하는 데에 실패했습니다. 다시 시도해주세요');
      console.error('일기를 수정하지 못했습니다. 다시 시도해주세요', error);
      };
  };

  const onDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/delete/${id}`);
      setDiarys(diarys.filter((diary) => diary.id !== res.data));
    } catch(error) {
      alert('일기를 삭제하는 데에 실패했습니다. 다시 시도해주세요');
      console.error('일기를 삭제하지 못했습니다. 다시 시도해주세요', error);
    };
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={diarys}>
        <DiarySetContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiarySetContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
