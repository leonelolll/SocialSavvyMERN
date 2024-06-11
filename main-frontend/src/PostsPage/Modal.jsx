import React from 'react';
import './modal.css'; // Ensure you have proper styling

const Modal = ({ isOpen, onClose, post, sasToken }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-post">
            <div className="modal-picture">
                {post.mediaType === 'video' ? (
                    <video id="media" src={(post.Media + '?' + sasToken)} controls />
                ) : (
                    <img id="media" src={(post.Media + '?' + sasToken)} alt="Preview" />
                )}
            </div>
          <div className="modal-post-details">
            {post.Status === "Scheduled"?(
                <div></div>
            )
                :(
            <div className="post-details"><div className="likes">
                    <img src="images/heart.svg" alt="Likes" />
                    <span>100</span>
                </div>
                <div className="views">
                    <img src="images/eye.svg" alt="Views" />
                    <span>100</span>
                </div>
                <div className="comments">
                    <img src="images/comment.svg" alt="Comments" />
                    <span>100</span>
                </div>
                <div className="date" value={post.value}>
                    <img src="images/clock.svg" alt="Date" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
                )}
            <p><strong>Username</strong> {post.Caption}</p>
            <p>{post.PlatformName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
