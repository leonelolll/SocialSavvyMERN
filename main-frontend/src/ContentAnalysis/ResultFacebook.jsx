import React from 'react';
import './ContentAnalysis.css';

function ResultFacebook({ posts, handleViewButtonClick }) {
  return (
    <div className="Facebook-container" id="blankContainer">
      {posts.map((post, index) => (
        <div className="postFacebook" key={index}>
          <div className="header">
                <img className="pfp"/>
                <div className="fb-top">
                    <p>{post.username}</p>
                    <p>{post.date}</p>
                </div>
              <button className="view-button-fb" onClick={handleViewButtonClick}>View</button>
          </div>
          <div className="Facebook-content">
            <p>{post.description}</p>
            <div className="image-container">
              <img src={post.displayUrl} alt="Workshop Image" />
            </div>
          </div>
          <div className="footer">
            <div className="stats">
            <div className="likes"><img src="images/heart.svg" alt="Likes" /><span>{post.likes}</span></div>
            <div className="comments"><img src="images/comment.svg" alt="Likes" /><span>{post.comments}</span></div>
              <span>536 shares</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultFacebook;
