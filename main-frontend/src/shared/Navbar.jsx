import React from 'react'
import s from "../dashboard/dashboard.module.css";
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

import pfp from "../assets/images/user.png"

function Navbar() {
    const { currentUser } = useSelector(state => state.user);

    const navigate = useNavigate();

    const confirmLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            // If the user confirms, redirect to the logout page
            //   removeCookie("token");
            navigate("/login");
        }
    };

    return (
        <div className={s.top}>
            <div className={s.dropdown}>
                <button className={s.dropbtn}>Help  &#11206;</button>
                <div className={s.dropdown_content}>
                    <Link to="faq" className={s.a}>FAQ</Link>
                    <Link to="feedback" className={s.a}>Feedback</Link>
                    <Link to="helpdesk" className={s.a}>Help Desk</Link>
                </div>
            </div>
            <div className={s.right}>
                <button className={s.rightbtn}>
                    &#11206; Hi, user
                    <img className={s.profpic} src={currentUser.profilePicture} alt="user" />
                </button>
                <div className={s.right_content}>
                    <Link to="profile.html">
                        <h4 className={s.name}>user</h4>
                        <p className={s.email}>{currentUser.email}</p>
                    </Link>
                    <Link to="edit-profile.html">Edit Profile</Link>
                    <button className={s.logoutbtn} onClick={confirmLogout}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar