import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function ForgetPass() {
    const lineStyle = { stroke: "black", strokeWidth: 1 };
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({
        email: "",
    });
    const { email } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-left",
        });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "/forgetpass",
                {
                    ...inputValue,
                },
                { withCredentials: true }
            );
            console.log(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
        });
    };

    return (
        <div className="split-screen">
            <div className="left">
                <section className="copy">
                    <div className="logo">
                        <img src="../../assets/images/socialsavvy-logo.png" alt="SocialSavvy" />
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
                        <h2>Recover Your Password!</h2>
                        <div className="login-container">
                            Enter your email address here
                        </div>
                    </section>
                    <div className="input-container email">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email address"
                            onChange={handleOnChange}
                        />
                    </div>
                    <button className="signup-btn" type="submit">submit</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgetPass;