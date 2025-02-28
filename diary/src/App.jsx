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
import { ofetch } from "ofetch";

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

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    // const storedData = localStorage.getItem("diary");
    // if (!storedData) {
    //   // 에러 처리(1)
    //   // undefined 또는 Null일 경우, JSON.parse 함수 호출 시 에러 발생
    //   setIsLoading(false);
    //   return;
    // }
    // const parsedData = JSON.parse(storedData);

    // if (!Array.isArray(parsedData)) {
    //   // 에러 처리(2)
    //   // parsedData가 배열이 아닌 경우, forEach 함수 호출 시 에러 발생
    //   setIsLoading(false);
    //   return;
    // }

    // let maxId = 0;
    // parsedData.forEach((item) => {
    //   if (Number(item.id) > maxId) {
    //     maxId = Number(item.id);
    //   }
    // });

    // idRef.current = maxId + 1;

    const fetchData = async () => {
      try {
        const parsedData = await ofetch("http://localhost:8080/home");
        console.log(parsedData);

        dispatch({
          type: "INIT",
          data: parsedData,
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
