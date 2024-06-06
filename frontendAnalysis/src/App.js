import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      window.location.href = "login.html";
    }
  };
  
  useEffect(() => {
    // Function to dynamically load scripts
    const loadScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    // Load external scripts
    loadScript('https://cdn.jsdelivr.net/npm/chart.js');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js');
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    loadScript(process.env.PUBLIC_URL + '/analysis.js'); // Assuming analysis.js is in the public folder
  }, []);

  return (
    <div>    
      <div className="side-nav">
        <div className="logo">
          <img src="images/logo.png" className="user-img" alt="logo" />
          <h2>socialsavvy</h2>
        </div>
        <ul className="menu">
          <li><a href="dashboard.html"><img src="images/dashboard.svg" alt="dashboard"/><p>Dashboard</p></a></li>
          <li><a href="post.html"><img src="images/post.svg" alt="post"/><p>Post</p></a></li>
          <li><a href="calendar.html"><img src="images/calendar.svg" alt="calendar"/><p>Calendar</p></a></li>
          <li className="active"><a href="analysis.html"><img src="images/analysis.svg" alt="analysis"/><p>Analytics</p></a></li>
          <li><a href="viral-content.html"><img src="images/flame.svg" alt="viral content"/><p>Viral Content</p></a></li>
          <li><a href="payment.html"><img src="images/payment-methods.svg" alt="payment"/><p>Subscription</p></a></li>
          <li><a href="edit-profile.html"><img src="images/settings.svg" alt="settings"/><p>Settings</p></a></li>
        </ul>
        <hr/>
        <ul className="logout">
          <li><p>Logout</p></li>
        </ul>
      </div>
    
      <div className="background">
        <div className="top">
          <div className="dropdown">
            <button className="dropbtn">Help  &#11206;</button>
            <div className="dropdown-content">
              <a href="faq.html">FAQ</a>
              <a href="feedback.html">Feedback</a>
              <a href="helpdesk.html">Help Desk</a>
            </div>
          </div>
          <div className="right">
            <button className="rightbtn">&#11206; Hi, user <img src="images/user.png" alt="user" /></button>
            <div className="right-content">
              <a href="profile.html"><h4 className="name">user</h4><p className="email">user@gmail.com</p></a>
              <a href="edit-profile.html">Edit Profile</a>
              <button onClick={confirmLogout}>Log Out</button>
            </div>
          </div>
        </div>

        <div className="container">
          <h1>Engagement Analytics</h1>
          <button className="button" id="sync"><h4>Sync social media data</h4></button>
          <button className="button" id="report"><h4>Generate full report</h4></button>
            
          <div className="flexbox">
            <div className="stats" id="likes">
              <h3>Likes</h3>
              <b id="likesCounter">0</b>
            </div>
            <div className="stats" id="shares">
              <h3>Shares</h3>
              <b id="sharesCounter">0</b>
            </div>
            <div className="stats" id="comments">
              <h3>Comments</h3>
              <b id="commentsCounter">0</b>
            </div>
            <div className="stats" id="ctr">
              <h3>Click-Through Rates</h3>
              <b id="ctrCounter">0</b>
            </div>
          </div>
            
          <div className="pattern" id="pattern1">
            <h5>Content Performance Analysis</h5>
            <canvas id="Chart1"></canvas>
          </div>
          <div className="pattern" id="pattern2">
            <h5>Click-Through Rate Analysis</h5>
            <canvas id="Chart2"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
