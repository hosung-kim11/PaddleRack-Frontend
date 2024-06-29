import React, { useState, useEffect } from "react";
import "./styles/SignUp.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./spinner";
import { register, login, reset } from "../features/auth/authSlice";

// import axios from "axios";

function SignUpForm() {
  // set the state of the login form data
  const [loginForm, setLoginForm] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  // set the state of the register form data
  const [registerForm, setRegisterForm] = useState({
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPassword2: "",
  });

  // get form data
  const { loginEmail, loginPassword } = loginForm;
  const { registerName, registerEmail, registerPassword, registerPassword2 } =
    registerForm;

  // redirects and redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/"); // navigate to home page
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onLoginChange = (e) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegisterChange = (e) => {
    setRegisterForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerPassword !== registerPassword2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      };
      dispatch(register(userData));
    }
  };

  // make toasts for errors on incorrect password
  const onLoginSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: loginEmail,
      password: loginPassword,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container-signUp">
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input id="login-or-register" type="checkbox" className="toggle" />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form
                  onSubmit={onLoginSubmit}
                  className="flip-card__form"
                  action=""
                >
                  <input
                    className="flip-card__input"
                    name="loginEmail"
                    id="loginEmail"
                    placeholder="Email"
                    type="email"
                    value={loginEmail}
                    onChange={onLoginChange}
                  />
                  <input
                    className="flip-card__input"
                    name="loginPassword"
                    placeholder="Password"
                    type="password"
                    id="loginPassword"
                    value={loginPassword}
                    onChange={onLoginChange}
                  />
                  <button className="flip-card__btn">Let's go!</button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form
                  onSubmit={onRegisterSubmit}
                  className="flip-card__form"
                  action=""
                >
                  <input
                    className="flip-card__input"
                    placeholder="Name"
                    type="name"
                    name="registerName"
                    id="registerName"
                    value={registerName}
                    onChange={onRegisterChange}
                  />
                  <input
                    className="flip-card__input"
                    name="registerEmail"
                    placeholder="Email"
                    type="email"
                    id="registerEmail"
                    value={registerEmail}
                    onChange={onRegisterChange}
                  />
                  <input
                    className="flip-card__input"
                    name="registerPassword"
                    placeholder="Password"
                    type="password"
                    id="registerPassword"
                    value={registerPassword}
                    onChange={onRegisterChange}
                  />
                  <input
                    className="flip-card__input"
                    name="registerPassword2"
                    placeholder="Confirm Password"
                    type="password"
                    id="registerPassword2"
                    value={registerPassword2}
                    onChange={onRegisterChange}
                  />
                  <button className="flip-card__btn">Confirm!</button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
