import React from 'react';
import userIcon from '../assets/images/user.png';

function TopBar() {
  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      window.location.href = "login.html";
    }
  };

  return (
    <div className="top">
      <div className="dropdown">
        <button className="dropbtn">Help &#11206;</button>
        <div className="dropdown-content">
          <a href="faq.html">FAQ</a>
          <a href="feedback.html">Feedback</a>
          <a href="helpdesk.html">Help Desk</a>
        </div>
      </div>
      <div className="right">
        <button className="rightbtn">&#11206; Hi, user<img src={userIcon} alt="User" /></button>
        <div className="right-content">
          <a href="profile.html"><h4 className="name">user</h4><p className="email">user@gmail.com</p></a>
          <a href="edit-profile.html">Edit Profile</a>
          <a href="#" onClick={confirmLogout}>Log Out</a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
