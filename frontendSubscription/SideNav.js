import React from 'react';
import logo from '../assets/images/logo.png';
import dashboardIcon from '../assets/images/dashboard.svg';
import postIcon from '../assets/images/post.svg';
import calendarIcon from '../assets/images/calendar.svg';
import analysisIcon from '../assets/images/analysis.svg';
import viralContentIcon from '../assets/images/flame.svg';
import paymentMethodsIcon from '../assets/images/payment-methods.svg';
import settingsIcon from '../assets/images/settings.svg';

function SideNav() {
  return (
    <div className="side-nav">
      <div className="logo">
        <img src={logo} className="user-img" alt="logo" />
        <h2>socialsavvy</h2>
      </div>
      <ul className="menu">
        <li><a href="dashboard.html"><img src={dashboardIcon} alt="Dashboard" /><p>Dashboard</p></a></li>
        <li><a href="post.html"><img src={postIcon} alt="Post" /><p>Post</p></a></li>
        <li><a href="calendar.html"><img src={calendarIcon} alt="Calendar" /><p>Calendar</p></a></li>
        <li><a href="analysis.html"><img src={analysisIcon} alt="Analysis" /><p>Analysis</p></a></li>
        <li><a href="viral-content.html"><img src={viralContentIcon} alt="Viral Content" /><p>Viral Content</p></a></li>
        <li className="active"><a href="payment.html"><img src={paymentMethodsIcon} alt="Subscription" /><p>Subscription</p></a></li>
        <li><a href="edit-profile.html"><img src={settingsIcon} alt="Settings" /><p>Settings</p></a></li>
      </ul>
      <ul className="logout">
        <li><p>Logout</p></li>
      </ul>
    </div>
  );
}

export default SideNav;
