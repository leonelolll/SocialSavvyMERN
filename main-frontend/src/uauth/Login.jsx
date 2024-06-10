import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

import "./style1.css"
// import logo from "../../assets/images/socialsavvy-logo.png"

function Login() {
  const lineStyle = { stroke: "black", strokeWidth: 1 };

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/main-backend/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      console.log("Response text:", text);

      const data = JSON.parse(text);
      dispatch(signInSuccess(data));
      if (data.success === false) {
        dispatch(signInFailure());
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error));
    }

  };

  return (
    <div className="split-screen">
      <div className="left">
        <section className="copy">
          <div className="logo">
            <img src="../../../public/assets/images/socialsavvy-logo.png" alt="SocialSavvy" />
          </div>
          <h1>Simplify, Create,<br />Join Us!</h1>
          <svg width="203" height="1">
            <line x1="0" y1="0" x2="203" y2="0" style={lineStyle} />
          </svg>
          <p><i> Streamline Content, Amplify Impact</i></p>
        </section>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <section className="copy">
            <h2>Welcome Back!</h2>
            <div className="login-container">
              Log into your account
            </div>
          </section>
          <div className="input-container email">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-container password">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
            />
            <i className="far fa-eye-slash"></i>
          </div>
          <p className="errorMsg">{error && "Something went wrong!"}</p>
          <button disabled={loading} className="signup-btn" type="submit">
            {loading ? "Loading..." : "Log In"}
          </button>
          <div className="input-container cta">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="l-checkmark"></span>
              <small>Remember me</small>
            </label>
            <div className="forgot-password">
              <p><small><Link to="/forgetpass">Forgot password?</Link></small></p>
            </div>
          </div>
          <button className="signup-w-google-btn">
            <Link to="/dashboard">Sign in with Google</Link>
          </button>
          <div className="register-prompt">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login