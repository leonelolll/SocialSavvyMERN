import React from 'react';

const DeletePost = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      onDelete(postId);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again later.');
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeletePost;
