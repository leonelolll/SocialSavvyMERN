import React from 'react';
import './ContentAnalysis';
import heartIcon from '../assets/images/heart.svg'
import commentsIcon from '../assets/images/comment.svg'
import sharesIcon from '../assets/images/redo.png'

function ResultFacebook({ posts, selectedRadio }) {
  const handleViewButtonClick = (url) => {
    const confirmMsg = window.confirm(`Open on ${selectedRadio}?`);
    if (confirmMsg) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="Facebook-container" id="blankContainer">
      {posts.map((post, index) => (
        <div className="postFacebook" key={index}>
          <div className="postFacebookHeader">
            <div className="fbtop">
              <p>{post.user ? post.user.name : 'Unknown User'}</p>
              <p>{new Date(post.date).toLocaleDateString()}</p>
            </div>
            <button 
              className="view-button-fb" 
              onClick={() => handleViewButtonClick(post.url)}  // Wrap in an anonymous function
            >
              View
            </button>
          </div>
          <div className="Facebook-content">
            <p>{post.text}</p>
            <div className="image-container">
              {/* Render images here if available */}
            </div>
          </div>
          <div className="footerFacebook">
            <div className="Stats">
              <div className="likes"><img src={heartIcon} alt="Likes" /><span>{post.likesCount}</span></div>
              <div className="comments"><img src={commentsIcon} alt="Comments" /><span>{post.commentsCount}</span></div>
              <div className="shares"><img src={sharesIcon} alt="Shares" /><span>{post.sharesCount}</span></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultFacebook;
