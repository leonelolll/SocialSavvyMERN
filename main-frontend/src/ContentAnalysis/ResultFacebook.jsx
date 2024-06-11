import React from 'react';
import './ContentAnalysis';
import heartIcon from '../assets/images/heart.svg'
import commentsIcon from '../assets/images/comment.svg'
//import sharesIcon from '../assets/images/shares.svg'


function ResultFacebook({ posts, handleViewButtonClick }) {
  return (
    <div className="Facebook-container" id="blankContainer">
      {posts.map((post, index) => (
        <div className="postFacebook" key={index}>
          <div className="postFacebookHeader">
                <div className="fbtop">
                    <p>{post.username}</p>
                    <p>{new Date(post.timestamp).toLocaleDateString()}</p>
                </div>
              <button className="view-button-fb" onClick={handleViewButtonClick}>View</button>
          </div>
          <div className="Facebook-content">
            <p>{post.caption}</p>
            <div className="image-container">
            </div>
          </div>
          <div className="footerFacebook">
            <div className="Stats">
            <div className="likes"><img src={heartIcon} alt="Likes" /><span>{post.likesCount}</span></div>
            <div className="comments"><img src={commentsIcon} alt="Comments" /><span>{post.commentsCount}</span></div>
            <div className="shares"><img src={commentsIcon} alt="Shares" /><span>{post.sharesCount}</span></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultFacebook;
