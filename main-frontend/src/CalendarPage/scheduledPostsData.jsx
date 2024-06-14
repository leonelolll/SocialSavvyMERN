import React from 'react';
import './scheduledPosts.css';

const ScheduledPosts = ({ scheduledPostsData, onDateClick }) => {
  const handlePostClick = (dateString) => {
    const date = new Date(dateString);
    onDateClick(date);
  };

  return (
    <div className="scheduled-posts">
      <div className="schedule-post-label">
        <h2>Scheduled Posts</h2>
      </div>
      <div className="schedulepost-list-frame">
      <ul className="scheduledpost-list">
          {scheduledPostsData.map(post => (
            <li key={post.id} className="scheduledpost-item" onClick={() => handlePostClick(post.scheduledDate)}>
              <div className="scheduledpost-header">
                <h3 className="scheduledpost-title">{post.Title}</h3>
                <span className="scheduledpost-date">{new Date(post.scheduledDate).toLocaleDateString()}</span>
              </div>
              <p className="scheduledpost-description">{post.Caption}</p>
            </li>
          ))}
        </ul>
      </div>
        
    </div>
  );
};

export default ScheduledPosts;
