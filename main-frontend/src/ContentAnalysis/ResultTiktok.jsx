import React from 'react';
import heartIcon from '../assets/images/heart-white.png';
import commentsIcon from '../assets/images/comment-white.png';
import shareIcon from "../assets/images/share.png";

function ResultTiktok({ posts }) {
  // Add a check to handle undefined or null posts
  // Check if posts is undefined or null
  if (!posts) {
    return <div>No posts available</div>;
  }

  // Check if posts is an array
  if (!Array.isArray(posts)) {
    return <div>Posts data is not in the expected format</div>;
  }

  const handleViewButtonClick = (url) => {
    const confirmMsg = window.confirm(`Open on TikTok?`);
    if (confirmMsg) {
      window.open(url, '_blank');
    }
  };

  const nFormatter = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num;
  };

  return (
    <div className="blank-container" id="blankContainer">
      {posts.map((post, index) => {
        const truncatedCaption =
          post.text?.length > 60
            ? post.text.substring(0, 60) + '...'
            : post.text;

        return (
          <div className="postTiktok" key={index}>
            <div className="video-preview">
              <div className="video-side">
                <div className="likesTiktok">
                  <img src={heartIcon} alt="Likes" />
                  <span alt="88k">{nFormatter(post.diggCount)}</span>
                </div>
                <div className="commentsTiktok">
                  <img src={commentsIcon} alt="Comments" />
                  <span alt="88k">{nFormatter(post.commentCount)}</span>
                </div>
                <div className="sharesTiktok">
                  <img src={shareIcon} alt="Shares" />
                  <span alt="88k">{nFormatter(post.shareCount)}</span>
                </div>
              </div>
              <div className="video-bottom">
                <span alt="88k">▷{nFormatter(post.playCount)}</span>
                <button className="view-button" onClick={() => handleViewButtonClick(post.webVideoUrl)}>View</button>
              </div>
            </div>
            <div className="video-info">
              <p className="description">{truncatedCaption}</p>
              <div className="username">
                <div className="circle"></div>
                <p alt="88k">{post.authorMeta?.name}</p>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResultTiktok;
