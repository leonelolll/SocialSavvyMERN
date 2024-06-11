import React from 'react';
import './ContentAnalysis.css';

function ResultTiktok({ posts, selectedRadio }) {
  const handleViewButtonClick = (url) => {
    const confirmMsg = window.confirm(`Open on ${selectedRadio}?`);
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
          post.caption.length > 180
            ? post.caption.substring(0, 100) + '...'
            : post.caption;

        return (
          <div className="postTiktok" key={index}>
            <div className="video-preview">
              <div className="video-side">
                <div className="likesTiktok">
                  <img src="images/heart-white.png" alt="Likes" />
                  <span>{nFormatter(post.likesCount)}</span>
                </div>
                <div className="commentsTiktok">
                  <img src="images/comment-white.png" alt="Comments" />
                  <span>{nFormatter(post.commentsCount)}</span>
                </div>
              </div>
              <div className="video-bottom">
                <span>▷ 1.5M</span>
                <button className="view-button" onClick={() => handleViewButtonClick(post.url)}>view</button>
              </div>
            </div>
            <div className="video-info">
              <p className="description">{truncatedCaption}</p>
              <div className="username">
                <div className="circle"></div>
                <p>{post.username}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResultTiktok;
