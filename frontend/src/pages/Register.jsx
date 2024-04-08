import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import routes, { backed_urls } from "../routes";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axiosclient";
import Loader from "../components/loader";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isShow, setIsShow] = useState(false);
  const [isShow1, setIsShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmsPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission logic, like sending data to server or validating the credentials
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    if (username.length < 2) {
      alert("username should be grater then 2");
      return;
    }

    if (password != confirmPassword) {
      alert("passward and confirm passward does not match.");
      return;
    }

    setLoading(true);

    const login_details = { username, password };

    axiosClient
      .post(backed_urls.register, login_details)
      .then((e) => {
        setLoading(false);
        if (e.data.status == 200) {
          localStorage.setItem("@user", e.data.id);
          navigate(routes.home);
        }
        if (e.data.status==400){
        alert('username is alerady exists.')  
        }
      })
      .catch((err) => {
        console.log("err ==>", err);
        alert("something went wrong.");
        setLoading(false);
      });
  };

  return (
    <>
      {!loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100vw", height: "100vh" }}
        >
          <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="d-flex align-items-center">
                  <input
                    type={!isShow ? "password" : "text"}
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <span className="ms-2">
                    {isShow ? (
                      <IoIosEyeOff onClick={() => setIsShow((show) => !show)} />
                    ) : (
                      <IoIosEye onClick={() => setIsShow((show) => !show)} />
                    )}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <div className="d-flex align-items-center">
                  <input
                    type={!isShow1 ? "password" : "text"}
                    value={confirmPassword}
                    onChange={handleConfirmsPasswordChange}
                    required
                  />
                  <span className="ms-2">
                    {isShow1 ? (
                      <IoIosEyeOff
                        onClick={() => setIsShow1((show) => !show)}
                      />
                    ) : (
                      <IoIosEye onClick={() => setIsShow1((show) => !show)} />
                    )}
                  </span>
                </div>
              </div>

              <button type="submit">Submit</button>
            </form>

            <div>
              {" "}
              already registerd? <Link to={routes.login}>click here</Link>{" "}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Register;
