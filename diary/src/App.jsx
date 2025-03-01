import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import { getEmotionImage } from "./util/get-emotion-image";
import Button from "./componenets/Button";
import Header from "./componenets/Header";
import axios from "axios";

/*
function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}
*/

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

  const onCreate = (created_date, emotion_id, content) => {
    try {
      const res = axios.post("http://localhost:8080/create", {
            created_date,
            emotion_id,
            content,
      });
    } catch(error) {
        alert('일기를 등록하는 데에 실패했습니다. 다시 시도해주세요');
        console.error('일기를 등록하지 못했습니다. 다시 시도해주세요', error);
    }
  };

  const onUpdate = (id, created_date, emotion_id, content) => {
    try {
      const res = axios.put(`http://localhost:8080/update/${id}`, {
          created_date,
          emotion_id,
          content,
        });
      } catch(error) {
        alert('일기를 수정하는 데에 실패했습니다. 다시 시도해주세요');
        console.error('일기를 수정하지 못했습니다. 다시 시도해주세요', error);
      };
  };

  const onDelete = (id) => {
    try {
      const res = axios.delete(`http://localhost:8080/delete/${id}`);
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
