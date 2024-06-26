import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { TODO_REDUCERES } from "../../redux/constant";
import axiosClient from "../../axiosclient";
import { backed_urls } from "../../routes";
import Confimation from "../../utlis/Confimation";
import TodoForm from "../../utlis/TodoForm";

function Todo({ data }) {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const id = data?.todo_id;

  useEffect(() => {
    setIsChecked(!(data?.status == "in-progress"));
  }, [data]);

  const handleCheckboxChange = (event) => {
    // if (event.target.checked) {
    axiosClient
      .patch(backed_urls.updateStatus, {
        todo_id: id,
        new_status: event.target.checked ? "done" : "in-progress",
      })
      .then((data) => {
        console.log("update status ====>", data);
        setIsChecked(event.target.checked);
      })
      .catch((errr) => {
        console.log("err in updaing status===>", errr);
      });
    // }
    setIsChecked(event.target.checked);
  };

  const handleForm = () => {
    dispatch({ type: TODO_REDUCERES.IS_FORM });
    dispatch({
      type: TODO_REDUCERES.TODO_DATA,
      payload: { ...data, heading: "Update Todo", isNew: false },
    });
  };

  return (
    <div
      className="d-flex todo-item p-3 m-3 rounded justify-content-between"
      style={{ maxWidth: "500px" }}
    >
      <Confimation show={isDelete} setShow={setIsDelete} id={id} />
      <TodoForm />

      <div className="d-flex align-items-center " style={{ maxWidth: "300px" }}>
        <div className="me-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="todo-details mx-2">
          <h4
            className={isChecked == true ? "text-decoration-line-through" : ""}
          >
            {data?.todo}
          </h4>
          <p
            className={isChecked == true ? "text-decoration-line-through" : ""}
          >
            {data?.description}
          </p>
        </div>
      </div>

      <div
        className="todo-status mx-2 d-flex flex-column justify-content-between"
        style={{ fontSize: "12px" }}
      >
        <div>
          <div>
            <strong>Status:</strong>{" "}
            <span style={{ color: !isChecked ? "red" : "green" }}>
              {!isChecked ? "in-progress" : "done"}
            </span>
          </div>
          {data?.due_date && (
            <div>
              <strong>Due Date:</strong>{" "}
              <span style={{ color: !isChecked ? "red" : "green" }}>
                {data?.due_date}
              </span>
            </div>
          )}
          {data?.catigorie && (
            <div>
              <strong>Catgories:</strong>{" "}
              <span style={{ color: !isChecked ? "red" : "green" }}>
                {data?.catigorie}
              </span>
            </div>
          )}

          {data?.priorities && (
            <div>
              <strong>Priorities:</strong>{" "}
              <span style={{ color: !isChecked ? "red" : "green" }}>
                {data?.priorities}
              </span>
            </div>
          )}
          
        </div>
        <div className="text-end d-flex">
          <FaRegEdit
            size={20}
            style={{ cursor: "pointer" }}
            className="m-2"
            onClick={handleForm}
          />
          <RiDeleteBin6Line
            size={20}
            color="red"
            style={{ cursor: "pointer" }}
            className="m-2"
            onClick={() => setIsDelete(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default Todo;
