import React from "react";
import { useDispatch } from "react-redux";
import { TODO_REDUCERES } from "../redux/constant";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'
import routes from "../routes";


function Header({ name = "Todo App" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-evenly align-items-center mt-3">
      <select
        name="filter"
        id="status"
        style={{ height: "30px" }}
        onChange={(e) => {
          dispatch({
            type: TODO_REDUCERES.TODO_FILTER,
            payload: e.target.value,
          });
        }}
      >
        <option selected value="all">
          All
        </option>
        <option value="in-progress">in-progress</option>
        <option value="done">done</option>
      </select>

      <div>
        <h1 className="text-center">{name}</h1>
      </div>

      <div>
      <CiLogout color="red" onClick={() => {
        localStorage.clear()
        navigate(routes.login)
      }} size={25} style={{cursor:'pointer'}}/>
      </div>
    </div>
  );
}

export default Header;
