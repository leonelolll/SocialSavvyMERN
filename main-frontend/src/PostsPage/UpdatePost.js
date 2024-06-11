import React, { useState } from 'react';

const UpdatePost = ({ post, onUpdate }) => {
  const [title, setTitle] = useState(post.Title);
  const [caption, setCaption] = useState(post.Caption);
  const [media, setMedia] = useState(post.Media);
  const [mediaType, setMediaType] = useState(post.mediaType);
  const [platformName, setPlatformName] = useState(post.PlatformName);
  const [status, setStatus] = useState(post.Status);
  const [scheduledDate, setScheduledDate] = useState(post.scheduledDate);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, caption, media, mediaType, platformName, status, scheduledDate, updatedAt: new Date() }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      onUpdate(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again later.');
    }
  };

  return (
    <div>
      <h3>Update Post</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Caption"
      />
      <input
        type="text"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
        placeholder="Media URL"
      />
      <input
        type="text"
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
        placeholder="Media Type"
      />
      <input
        type="text"
        value={platformName}
        onChange={(e) => setPlatformName(e.target.value.split(','))}
        placeholder="Platform Name (comma separated)"
      />
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Status"
      />
      <input
        type="datetime-local"
        value={new Date(scheduledDate).toISOString().slice(0, 16)}
        onChange={(e) => setScheduledDate(new Date(e.target.value).toISOString())}
        placeholder="Scheduled Date"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdatePost;
