import React from 'react';
import './ContentAnalysis.css';

function SideNav() {
  const confirmLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      window.location.href = 'login.html';
    }
  };

  return (
    <div className="side-nav">
      <div className="logo">
        <img src="images/logo.png" className="user-img" alt="Logo" />
        <h2>socialsavvy</h2>
      </div>
      <ul className="menu">
        <li>
          <a href="dashboard.html">
            <img src="images/dashboard.svg" alt="Dashboard" />
            <p>Dashboard</p>
          </a>
        </li>
        <li>
          <a href="post.html">
            <img src="images/post.svg" alt="Post" />
            <p>Post</p>
          </a>
        </li>
        <li>
          <a href="calendar.html">
            <img src="images/calendar.svg" alt="Calendar" />
            <p>Calendar</p>
          </a>
        </li>
        <li>
          <a href="analysis.html">
            <img src="images/analysis.svg" alt="Analytics" />
            <p>Analytics</p>
          </a>
        </li>
        <li className="active">
          <a href="viral-content.html">
            <img src="images/flame.svg" alt="Viral Content" />
            <p>Viral Content</p>
          </a>
        </li>
        <li>
          <a href="payment.html">
            <img src="images/payment-methods.svg" alt="Subscription" />
            <p>Subscription</p>
          </a>
        </li>
        <li>
          <a href="edit-profile.html">
            <img src="images/settings.svg" alt="Settings" />
            <p>Settings</p>
          </a>
        </li>
      </ul>
      <hr />
      <ul className="logout">
        <li>
          <p onClick={confirmLogout}>Logout</p>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
