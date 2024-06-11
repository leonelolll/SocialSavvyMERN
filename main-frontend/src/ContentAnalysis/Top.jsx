import React from 'react';
import './ContentAnalysis.css';

function Top() {
    const confirmLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
          window.location.href = 'login.html';
        }
      };
    return (
        <div className="top">
                <div className="dropdown">
                    <button className="dropbtn">
                    Help &#11206;
                    </button>
                    <div className="dropdown-content">
                    <a href="faq.html">FAQ</a>
                    <a href="feedback.html">Feedback</a>
                    <a href="helpdesk.html">Help Desk</a>
                    </div>
                </div>
                <div className="right">
                    <button className="rightbtn">
                    &#11206; Hi, user
                    <img src="images/user.png" alt="User" />
                    </button>
                    <div className="right-content">
                    <a href="profile.html">
                        <h4 className="name">user</h4>
                        <p className="email">user@gmail.com</p>
                    </a>
                    <a href="edit-profile.html">Edit Profile</a>
                    <button onClick={confirmLogout}>Log Out</button>
                    </div>
                </div>
            </div>
    );
}
    export default Top;