import React, { useState, useEffect } from 'react';
import './ContentAnalysis.css';
import './reset.css';
import heartIcon from '../assets/images/heart.svg'
import commentsIcon from '../assets/images/comment.svg'


function ResultInstagram({ posts, selectedRadio }) {
  const [localImages, setLocalImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const imageMap = {};
      for (const post of posts) {
        try {
          const response = await fetch(`/fetch-image?url=${encodeURIComponent(post.displayUrl)}`);
          if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const data = await response.json();
              imageMap[post.displayUrl] = data.imageUrl;
            } else {
              console.error('Error fetching image:', 'Response is not in JSON format');
            }
          } else {
            console.error('Error fetching image:', response.status);
          }
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
      setLocalImages(imageMap);
    };

    fetchImages();
  }, [posts]);

  const handleViewButtonClick = (url) => {
    const confirmMsg = window.confirm(`Open on ${selectedRadio}?`);
    if (confirmMsg) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="blank-container" id="blankContainer">
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <div className="username">
            <p className='name'>{post.ownerUsername}</p>
            <button
              className="view-button"
              onClick={() => handleViewButtonClick(post.url)}
            >
              view
            </button>
          </div>
          <div className="picture">
            <img src={post.displayUrl} alt="Post" />
          </div>
          <div className="post-details">
            <div className="postDetailtop">
              <div className="likes">
                <img src={heartIcon} alt="Likes" />
                <span>{post.likesCount}</span>
              </div>
              <div className="comments">
                <img src={commentsIcon} alt="Comments" />
                <span>{post.commentsCount}</span>
              </div>
            </div>
              <p className="description">
                {post.caption.length > 70
                  ? post.caption.substring(0, 62) + '...'
                  : post.caption}
              </p>
            
            <div className="date">
              <span>{new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultInstagram;
