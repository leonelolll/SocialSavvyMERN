import React from 'react';
import Heart from "../assets/images/heart.svg";
import Views from "../assets/images/eye.svg";
import Comments from "../assets/images/comment.svg";
import './modal.css'; // Ensure you have proper styling

const Modal = ({ isOpen, onClose, post, sasToken }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-post-content" onClick={(e) => e.stopPropagation()}>
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
            <div className="post-details-modal">
                    <div className="likes">
                    <img src={Heart} alt="Likes" />
                    <span>100</span>
                </div>
                <div className="views">
                    <img src={Views} alt="Views" />
                    <span>100</span>
                </div>
                <div className="comments">
                    <img src={Comments} alt="Comments" />
                    <span>100</span>
                </div>
                <div className="date" value={post.value}>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
                )}
            <p><strong>Username</strong> {post.Caption}</p>
            <p>Platforms: {post.PlatformName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
