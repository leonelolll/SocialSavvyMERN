import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import dashboardIcon from '../assets/images/dashboard.svg';
import postIcon from '../assets/images/post.svg';
import calendarIcon from '../assets/images/calendar.svg';
import analysisIcon from '../assets/images/analysis.svg';
import flameIcon from '../assets/images/flame.svg';
import paymentIcon from '../assets/images/payment-methods.svg';
import settingsIcon from '../assets/images/settings.svg';
import Heart from "../assets/images/heart.svg";
import Views from "../assets/images/eye.svg";
import Comments from "../assets/images/comment.svg";
import Modal from './Modal'; // Import the modal component
import './post.css'; // Ensure this path is correct
import UserPic from "../assets/images/user.png";

//fetch from azure
const sasToken = 'sp=rl&st=2024-06-09T08:47:19Z&se=2024-12-31T16:47:19Z&spr=https&sv=2022-11-02&sr=c&sig=EZQoEUteUffxbTniJg9AkLEQwBFksQ37YmCX4d4OIbI%3D';

const Filter = ({ platforms, selectedPlatform, onPlatformChange, selectedTimeframe, onTimeframeChange }) => (
  <div className="filter">
    <label htmlFor="platform">Filter by platform:</label>
    <select
      id="platform"
      value={selectedPlatform}
      onChange={(e) => onPlatformChange(e.target.value)}
    >
      <option value="">All</option>
      {platforms.map((platform, index) => (
        <option key={index} value={platform}>
          {platform}
        </option>
      ))}
    </select>
    <label htmlFor="timeframe">Filter by timeframe:</label>
    <select
      id="timeframe"
      value={selectedTimeframe}
      onChange={(e) => onTimeframeChange(e.target.value)}
    >
      <option value="">All</option>
      <option value="thisweek">This Week</option>
      <option value="thismonth">This Month</option>
      <option value="thisyear">This Year</option>
    </select>
  </div>
);

const Post = ({ post, onClick, onDelete }) => (
  <div className="post" >
    <div className="username">
      <div className="circle"></div>
      <p>username</p>
      <div className="dropdown-post">
                  <button className="dropbtn-post">
                  &#8230;
                  </button>
                  <div className="dropdown-post-content">
                  <button  >Edit</button>
                  <button onClick={() => onDelete(post._id)}>Delete</button> {/* Delete button */}
                  </div>
              </div>
    </div>
    <div className="picture"onClick={() => onClick(post)}>
      {post.mediaType === 'video' ? (
        <video id="media" src={(post.Media + '?' + sasToken)} controls />
      ) : (
        <img id="media" src={(post.Media + '?' + sasToken)} alt="Preview" />
      )}
    </div>
    <div className="post-details-postpage">
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
  </div>
);

const PostList = ({ posts, onPostClick, onDelete }) => (
  <div className="post-list">
    {posts.map((post, index) => (
      <Post key={index} post={post} onClick={onPostClick} onDelete={onDelete} />
    ))}
  </div>
);

const PostPage = () => {
  const [postedPosts, setPostedPosts] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('');
  const [modalPost, setModalPost] = useState(null);
  const platforms = ['Twitter', 'Instagram', 'Facebook', 'Tiktok'];

  //fetch post from mongodb
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/posts');
        const data = await response.json();

        // Filter posted and scheduled posts
        const posted = Array.isArray(data)? data.filter(post => post.Status === "Posted") : [];
        setPostedPosts(posted);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  const getStartOfWeek = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Assuming the week starts on Monday
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };
  
  const getStartOfMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return startOfMonth;
  };
  
  const getStartOfYear = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    return startOfYear;
  };

  const filteredPosts = postedPosts.filter((post) => {
    const postDate = new Date(post.createdAt);
    const postPlatforms = post.PlatformName || [];
  
    // Filter by selected platform
    if (selectedPlatform && !postPlatforms.some(platform => platform.toLowerCase() === selectedPlatform.toLowerCase())) {
      return false;
    }
  
    // Filter by selected timeframe
    if (selectedTimeframe === 'thisweek' && postDate < getStartOfWeek()) {
      return false;
    }
    if (selectedTimeframe === 'thismonth' && postDate < getStartOfMonth()) {
      return false;
    }
    if (selectedTimeframe === 'thisyear' && postDate < getStartOfYear()) {
      return false;
    }
  
    return true;
  });

  // Function to delete a post
  const handleDeletePost = async (postId) => {
    try {
      await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'DELETE',
      });
      setPostedPosts(postedPosts.filter(post => post._id !== postId)); // Remove deleted post from state
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // Function to handle click on a post
  const handlePostClick = (post) => {
    setModalPost(post);
  };

  const closeModal = () => {
    setModalPost(null);
  };

  const confirmLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      window.location.href = 'login.html';
    }
  };
  

  return (
    <div >
      <div className="side-nav">
      <div className="logo">
        <img src={logo} className="user-img" alt="Logo" />
        <h2>socialsavvy</h2>
      </div>
      <ul className="menu">
        <li><a className='a' href="dashboard.html"><img src={dashboardIcon} alt="Dashboard" /><p>Dashboard</p></a></li>
        <li className="active"><a className='a' href="/"><img src={postIcon} alt="Post" /><p>Post</p></a></li>
        <li><a className='a' href="calendar"><img src={calendarIcon} alt="Calendar" /><p>Calendar</p></a></li>
        <li><a className='a' href="analysis.html"><img src={analysisIcon} alt="Analysis" /><p>Analysis</p></a></li>
        <li><a className='a' href="viral-content.html"><img src={flameIcon} alt="Viral Content" /><p>Viral Content</p></a></li>
        <li><a className='a' href="payment.html"><img src={paymentIcon} alt="Subscription" /><p>Subscription</p></a></li>
        <li><a className='a' href="settings.html"><img src={settingsIcon} alt="Settings" /><p>Settings</p></a></li>
      </ul>
      <hr />
      <ul className="logout">
        <li><p>Logout</p></li>
      </ul>
    </div>

      <div className="background">

      <div className="top">
              <div className="dropdown">
                  <button className="dropbtn">
                  Help &#11206;
                  </button>
                  <div className="dropdown-content">
                  <a href="faq.html">FAQ</a>
                  <a href="feedback.html">Feedback</a>
                  <a href="helpdesk.html">Help Desk</a>
                  </div>
              </div>
              <div className="right">
                  <button className="rightbtn">
                  &#11206; Hi, user
                  <img src={UserPic} alt="User" />
                  </button>
                  <div className="right-content">
                  <a href="profile.html">
                      <h4 className="name">user</h4>
                      <p className="email">user@gmail.com</p>
                  </a>
                  <a href="edit-profile.html">Edit Profile</a>
                  <a href="#" onClick={confirmLogout}>Log Out</a>
                  </div>
              </div>
          </div>

        <div className="container">
          <h2>Content Posted</h2> 
          <div className="content">
            <div className="post-page">
            
              <div className="filter-section">
                <Filter
                  platforms={platforms}
                  selectedPlatform={selectedPlatform}
                  onPlatformChange={handlePlatformChange}
                  selectedTimeframe={selectedTimeframe}
                  onTimeframeChange={handleTimeframeChange}
                />
                <button onClick={() => window.location.href='/post/createpost'} className="add-post-button">Add New Post</button>
              </div>
              <PostList posts={filteredPosts} onPostClick={handlePostClick} onDelete={handleDeletePost} />
            </div>
          </div>
          {modalPost && (
            <Modal 
              isOpen={!!modalPost} 
              onClose={closeModal} 
              post={modalPost} 
              sasToken={sasToken} 
            />
          )}
        </div>
      </div>  
        
    </div>      
  );
};

export default PostPage;
