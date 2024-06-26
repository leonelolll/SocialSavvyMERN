import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import s from "./uauth.module.css";
import { app } from "../firebase.js";
import logo from "../assets/images/socialsavvy-logo.png"

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
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error));
    }

  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/main-backend/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      console.log("Could not login with Google", error)
    }
  };

  // const handleForgetPassword = async () => {

  // };

  return (
    <div className={s.split_screen}>
      <div className={s.left}>
        <section className={s.copy}>
          <div className={s.logo}>
            <img src={logo} alt="SocialSavvy" />
          </div>
          <h1>Simplify, Create,<br />Join Us!</h1>
          <svg width="203" height="1">
            <line x1="0" y1="0" x2="203" y2="0" style={lineStyle} />
          </svg>
          <p><i> Streamline Content, Amplify Impact</i></p>
        </section>
      </div>
      <div className={s.right}>
        <form onSubmit={handleSubmit}>
          <section className={s.copy}>
            <h2>Welcome Back!</h2>
            <div className={s.login_container}>
              Log into your account
            </div>
          </section>
          <div className={s.input_container.email}>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleOnChange}
            />
          </div>
          <div className={s.input_container.password}>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnChange}
            />
            <i className="far fa-eye-slash"></i>
          </div>
          <p className={s.errorMsg}>{error && "Something went wrong!"}</p>
          <button disabled={loading} className={s.signup_btn} type="submit">
            {loading ? "Loading..." : "Log In"}
          </button>
          <div className={s.input_container.cta}>
            <label className={s.checkbox_container}>
              <input type="checkbox" />
              <span className={s.l_checkmark}></span>
              <small>Remember me</small>
            </label>
            <div className={s.forgot_password}>
              <p><small><Link to="/forgetpass" >Forgot password?</Link></small></p>
            </div>
          </div>
          <button type="button" onClick={handleGoogleClick} className={s.signup_w_google_btn}>
            Sign in with Google
          </button>
          <div className={s.register_prompt}>
            <p>Don't have an account? <Link to="/register" className="register_here">Register here</Link></p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login