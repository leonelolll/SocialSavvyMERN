import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import s from "./uauth.module.css";
import logo from "../assets/images/socialsavvy-logo.png"

function ForgetPass() {
  const lineStyle = { stroke: "black", strokeWidth: 1 };
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("* Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("/main-backend/auth/forgetpass", values)
        .then((response) => {
          toast.success("Email sent successfully");
          setTimeout(() => {
            navigate("/resetpass"); // Redirect to reset password page
          }, 2000);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            toast.error("Email not found");
          } else {
            toast.error("Server error");
          }
        });
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <section className={s.copy}>
            <h2>Recover Your Password!</h2>
            <div className={s.login_container}>
              Enter your email address here
            </div>
          </section>
          <div className={s.input_container.email}>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={formik.touched.email && formik.errors.email ? s.errorMsg : ""}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={s["errorMsg"]}>{formik.errors.email}</div>
            ) : null}
          </div>
          <button className={s.signup_btn} type="submit">submit</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgetPass;