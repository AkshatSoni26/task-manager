import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Menu from "../components/menu/Menu";
import Todos from "../components/Todos/Todos";
import { useNavigate } from "react-router-dom";
import routes, { backed_urls } from "../routes";
import { useDispatch } from "react-redux";
import { TODO_REDUCERES } from "../redux/constant";
import axiosClient from "../axiosclient";
import Loader from "../components/loader";
import TodoForm from "../utlis/TodoForm";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem("@user");
    if (!user) {
      navigate(routes.login);
    }
    axiosClient
      .post(backed_urls.getToods, {
        user_id: user,
      })
      .then((data) => {
        setLoading(false);
        dispatch({ type: TODO_REDUCERES.TODOS, payload: data.data.todos });
      })
      .catch((err) => {
        setLoading(false);
        console.log("err ===>", err);
      });
  }, []);

  const handleShow = () => {
    dispatch({ type: TODO_REDUCERES.IS_FORM })
    dispatch({ type: TODO_REDUCERES.TODO_DATA, payload: {heading:'Create Todo', isNew: true} })
  };

  return (
    <>
      <div
        style={{
          cursor: "pointer",
          backgroundColor: "purple",
          width: "50px",
          height: "50px",
          color: "white",
          fontSize: "40px",
          borderRadius: "50%",
          position: "fixed",
          bottom: "10%",
          right: "10%",
        }}
        className="d-flex justify-content-center align-items-center"
        onClick={handleShow}
      >
        <div>+</div>
      </div>
      
      <main className="container">
        {!loading ? (
          <>
            <Header name="Todo App" />

            <div className="d-flex justify-content-center p-3">
              <TodoForm />
              <Todos />
            </div>
          </>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}

export default Home;
