import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import './calendar.css';
import ScheduledPosts from './scheduledPostsData';
import * as bootstrap from "bootstrap";

const CalendarPage = () => {
  const [scheduledPostsData, setScheduledPostsData] = useState([]);
  const calendarRef = useRef(null);  // Ref to access FullCalendar instance

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts');
        const data = await response.json();

        // Filter posted and scheduled posts
        const scheduled = data.filter(post => post.Status === "Scheduled");
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

  return (
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
            height={"500px"}
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
  );
};

export default CalendarPage;
