import React from 'react';
import './PostGrid.css';

const posts = [
    {
      username: '@username',
      imageUrl: '../post/shoes1.jpg',
      likes: 54000,
      views: 2235400,
      comments: 50,
      date: '2023-06-14',
      value: 'thisyear'
    },
    {
      username: '@username',
      imageUrl: '../post/shoes2.jpg',
      likes: 48000,
      views: 1153265,
      comments: 75,
      date: '2024-02-14',
      value: 'thisyear'
    },
    {
      username: '@username',
      imageUrl: '../post/shoes3.jpg',
      likes: 36000,
      views: 1004324,
      comments: 21,
      date: '2022-07-20',
      value: ''
    },
    {
      username: '@username',
      imageUrl: '../post/shoes4.jpg',
      likes: 12000,
      views: 863958,
      comments: 13,
      date: '2024-01-31',
      value: 'thisyear'
    },
    {
      username: '@username',
      imageUrl: '../post/shoes5.jpg',
      likes: 8000,
      views: 432245,
      comments: 25,
      date: '2024-04-20',
      value: 'thisweek'
    },
    {
      username: '@username',
      imageUrl: '../post/shoes6.jpg',
      likes: 5340,
      views: 245324,
      comments: 8,
      date: '2024-04-15',
      value: 'thismonth'
    },
    {
      username: '@username',
      imageUrl: '../post/shoes7.jpg',
      likes: 2435,
      views: 105423,
      comments: 25,
      date: '2024-03-20',
      value: 'thisyear'
    },
    {
      username: '@username',
      imageUrl: '../post/shoes8.jpg',
      likes: 987,
      views: 34532,
      comments: 15,
      date: '2023-12-25',
      value: 'thisyear'
    },
    {
      username: '@username',
      imageUrl: '../post/shoes9.jpg',
      likes: 564,
      views: 4533,
      comments: 6,
      date: '2024-02-02',
      value: 'thisyear'
    }
  ];

const PostGrid = () => {
    return (
        <div className="post-grid">
            {posts.map((post, index) => (
                <div key={index} className="post">
                    <div className="username">
                        <div className="circle"></div>
                        <p>@{post.username}</p>
                        <button className="view-button" onClick={() => console.log('View button clicked')}>view</button>
                    </div>
                    <div className="picture"><img src={post.imageUrl} alt="Post" /></div>
                    <div className="post-details">
                        <div className="likes"><img src="../images/heart.svg" alt="Likes" /><span>{post.likes}</span></div>
                        <div className="views"><img src="../images/eye.svg" alt="Views" /><span>{post.views}</span></div>
                        <div className="comments"><img src="../images/comment.svg" alt="Comments" /><span>{post.comments}</span></div>
                        <div className="date"><img src="../images/clock.svg" alt="Date" /><span>{post.date}</span></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostGrid;
