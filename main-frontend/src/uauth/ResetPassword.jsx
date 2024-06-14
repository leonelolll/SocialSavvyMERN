import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import s from "./uauth.module.css";
import logo from "../assets/images/socialsavvy-logo.png"

function ResetPassword() {
    const lineStyle = { stroke: "black", strokeWidth: 1 };
    const navigate = useNavigate();
    const { token } = useParams(); // Extract token from URL parameter

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required('* Required').min(6, 'Too Short!'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('* Required'),
    }),
    onSubmit: async (values) => {
      const { newPassword } = values;

      try {
        const response = await axios.post(`/main-backend/auth/resetpass/${token}`, {
          newPassword,
        });

        toast.success(response.data.message); 
        setTimeout(() => {
          window.location.href = '/login'; // Redirect to login page after successful password reset
        }, 3000); // Redirect after 3 seconds
      } catch (error) {
        toast.error('Your link has expired'); // Example error handling, replace with toast or alert
        console.error('Error resetting password:', error);
      }
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
                        <h2>OTP Verification</h2>
                        <div className={s.login_container}>
                            Enter the code sent to your email
                        </div>
                    </section>
                    <div className={s.input_container.password}>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                            placeholder="New password"
                        />
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <div>{formik.errors.newPassword}</div>
                        ) : null}
                    </div>
                    <div className={s.input_container.password}>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            placeholder="Confirm new password"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div>{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>
                    <button className={s.signup_btn} type="submit">submit</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default ResetPassword