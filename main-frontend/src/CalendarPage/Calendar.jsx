import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './calendar.css';
import ScheduledPosts from './scheduledPostsData';
import * as bootstrap from "bootstrap";
import logo from '../assets/images/logo.png';
import dashboardIcon from '../assets/images/dashboard.svg';
import postIcon from '../assets/images/post.svg';
import calendarIcon from '../assets/images/calendar.svg';
import analysisIcon from '../assets/images/analysis.svg';
import flameIcon from '../assets/images/flame.svg';
import paymentIcon from '../assets/images/payment-methods.svg';
import settingsIcon from '../assets/images/settings.svg';
import UserPic from '../assets/images/user.png';

const CalendarPage = () => {
  const [scheduledPostsData, setScheduledPostsData] = useState([]);
  const calendarRef = useRef(null);  // Ref to access FullCalendar instance

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts');
        const data = await response.json();

        // Filter posted and scheduled posts
        const scheduled = Array.isArray(data) ? data.filter(post => post.Status === "Scheduled") : [];
        setScheduledPostsData(scheduled);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const toISO8601WithoutOffset = (dateString) => {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    return isoString.replace('Z', '');
  };

  const events = scheduledPostsData.map(post => ({
    title: post.Title,
    start: toISO8601WithoutOffset(post.scheduledDate),
    end: toISO8601WithoutOffset(post.scheduledDate), // Assuming end date is the same as start date
    extendedProps: {
      description: post.Caption,
      media: post.Media
    }
  }));

  const handleDateClick = (date) => {
    const calendarApi = calendarRef.current.getApi(); // Access FullCalendar API
    calendarApi.gotoDate(date);
  };

  const confirmLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      window.location.href = 'login.html';
    }
  };

  return (
    <div><div className="side-nav">
    <div className="logo">
      <img src={logo} className="user-img" alt="Logo" />
      <h2>socialsavvy</h2>
    </div>
    <ul className="menu">
        <li><a className='a' href="http://localhost:3000/dashboard"><img src={dashboardIcon} alt="Dashboard" /><p>Dashboard</p></a></li>
        <li><a className='a' href="http://localhost:3000/post"><img src={postIcon} alt="Post" /><p>Post</p></a></li>
        <li className="active"><a className='a' href="http://localhost:3000/calendar"><img src={calendarIcon} alt="Calendar" /><p>Calendar</p></a></li>
        <li><a className='a' href="http://localhost:3000/analysis"><img src={analysisIcon} alt="Analysis" /><p>Analysis</p></a></li>
        <li><a className='a' href="http://localhost:3000/ContentAnalysis"><img src={flameIcon} alt="Viral Content" /><p>Viral Content</p></a></li>
        <li><a className='a' href="http://localhost:3000/subscriptions"><img src={paymentIcon} alt="Subscription" /><p>Subscription</p></a></li>
        <li><a className='a' href="http://localhost:3000/settings"><img src={settingsIcon} alt="Settings" /><p>Settings</p></a></li>
      </ul>
    <hr />
    <ul className="logout">
      <li><p>Logout</p></li>
    </ul>
    </div>

    <div className="background">

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
                <img src={UserPic} alt="User" />
                </button>
                <div className="right-content">
                <a href="profile.html">
                    <h4 className="name">user</h4>
                    <p className="email">user@gmail.com</p>
                </a>
                <a href="edit-profile.html">Edit Profile</a>
                <a href="#" onClick={confirmLogout}>Log Out</a>
                </div>
            </div>
        </div>
    <div className="container">
      <h2>Content Calendar</h2>

      <div className="content-calendar"> 
        <div className='calendar'>
          <FullCalendar
            ref={calendarRef}  // Attach the ref to FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: 'today prev,next',
              center: 'title',
              end: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            height={"75vh"}
            events={events}
            eventDidMount={(info) => {
              return new bootstrap.Popover(info.el, {
                title: info.event.title,
                placement: "auto",
                trigger: "hover",
                customClass: "popoverStyle",
                content: `<p>${info.event.extendedProps.description}</p>`,
                html: true,
              });
            }}
          />
        </div>

        <ScheduledPosts onDateClick={handleDateClick} scheduledPostsData={scheduledPostsData} />

      </div> 
    </div>
    </div>
    </div>
  );
};

export default CalendarPage;
