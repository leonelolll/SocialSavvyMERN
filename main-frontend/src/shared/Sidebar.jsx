import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import s from "../dashboard/dashboard.module.css";

import logo from "../assets/images/logo.png"
import dashboardsvg from "../assets/images/dashboard.svg"
import postsvg from "../assets/images/post.svg"
import calendarsvg from "../assets/images/calendar.svg"
import analysissvg from "../assets/images/analysis.svg"
import framesvg from "../assets/images/flame.svg"
import paymentsvg from "../assets/images/payment-methods.svg"
import settingssvg from "../assets/images/settings.svg"

function Sidebar() {
    const navigate = useNavigate();

    const confirmLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            navigate('/login');
        }
    };

    return (
        <div className={s.side_nav}>
            <div className={s.logo}>
                <img src={logo} alt="logo" />
                <h2>socialsavvy</h2>
            </div>
            <ul className={s.menu}>
                <li><Link to="/dashboard" class={s.a}><img src={dashboardsvg} alt="dashboard" /><p>Dashboard</p></Link></li>
                <li><Link to="post.html" class={s.a}><img src={postsvg} alt="post" /><p>Post</p></Link></li>
                <li><Link to="calendar.html" class={s.a}><img src={calendarsvg} alt="calendar" /><p>Calendar</p></Link></li>
                <li ><Link to="analysis.html" class={s.a}><img src={analysissvg} alt="analysis" /><p>Analytics</p></Link></li>
                <li><Link to="viral-content.html" class={s.a}><img src={framesvg} alt="viral content" /><p>Viral Content</p></Link></li>
                <li><Link to="payment.html" class={s.a}><img src={paymentsvg} alt="payment" /><p>Subscription</p></Link></li>
                <li><Link to="edit-profile.html" class={s.a}><img src={settingssvg} alt="settings" /><p>Settings</p></Link></li>
            </ul>
            <hr />
            <ul className={s.logout}>
                <li onClick={confirmLogout}><p>Logout</p></li>
            </ul>
        </div>
    );
}

export default Sidebar