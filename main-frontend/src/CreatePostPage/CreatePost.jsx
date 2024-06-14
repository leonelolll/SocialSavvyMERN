import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import dashboardIcon from '../assets/images/dashboard.svg';
import postIcon from '../assets/images/post.svg';
import calendarIcon from '../assets/images/calendar.svg';
import analysisIcon from '../assets/images/analysis.svg';
import flameIcon from '../assets/images/flame.svg';
import paymentIcon from '../assets/images/payment-methods.svg';
import settingsIcon from '../assets/images/settings.svg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Select from 'react-select';
import './createpost.css';
import { BlobServiceClient } from '@azure/storage-blob';
import UserPic from '../assets/images/user.png';
import Media from '../assets/images/previewimage.jpg';
import axios from 'axios';


function CreatePost() {
  const [platforms, setPlatforms] = useState([]);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState(Media);
  const [mediaType, setMediaType] = useState('image'); // Added state for media type
  const [postType, setPostType] = useState('now');
  const [scheduleTime, setScheduleTime] = useState('');
  const [url, setUrl] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // State for selected platforms
  const [selectedDraft, setSelectedDraft] = useState("");
  const [file, setFile] = useState(null);
  //const [text, setText] = useState('');
  const [correctText, setCorrectText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCorrectedText, setShowCorrectedText] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isCorrectedTextApplied, setIsCorrectedTextApplied] = useState(false);



  // Function to handle platform selection
  const handlePlatformChange = (selectedOptions) => {
    setSelectedPlatforms(selectedOptions);
  };
  
  useEffect(() => {
    if (url) {
      document.getElementById('media').src = url;
    }
  }, [url]);

// Initialize Azure Blob Storage client
const accountName = 'illyanabila14';
const containerName = 'blobby';
const sasToken = 'sv=2022-11-02&ss=bfqt&srt=o&sp=rwdlacupiytfx&se=2024-12-31T17:47:39Z&st=2024-06-09T09:47:39Z&spr=https&sig=Q8J77f0%2B2ki5V7KvDBseS1m%2FtmNm6bgyh0N2lu1ZfrY%3D';
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net?${sasToken}`
);
const containerClient = blobServiceClient.getContainerClient(containerName);

   // Preview content
   const handleMediaChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const newUrl = URL.createObjectURL(file);
        setUrl(newUrl);
        setMedia(newUrl);
        if (file.type.startsWith('video/')) {
            setMediaType('video');
            const thumbnail = await generateVideoThumbnail(file);
            setMedia(thumbnail);
        } else {
            setMediaType('image');
            setMedia(newUrl);
        }
        setFile(file);
    }
  };


  const generateVideoThumbnail = (videoFile) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(videoFile);
        video.onloadeddata = () => {
            video.currentTime = 1; // capture the frame at 1 second
        };
        video.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                const thumbnailUrl = URL.createObjectURL(blob);
                resolve(thumbnailUrl);
            });
        };
        video.onerror = (error) => reject(error);
    });
  };


  const handleButtonClick = (event) => {
    document.querySelector('.special')?.classList.remove('special');
    event.target.classList.add('special');
    document.getElementById('dynamic-caption').textContent = caption;
  };

  //fetch from user linked social media
  const platformsOptions = [
    { label: "Facebook", value: "facebook" },
    { label: "Instagram", value: "instagram" },
    { label: "Twitter", value: "twitter" },
    { label: "Linkedin", value: "linkedin" },
    ];
    
  const draftsOptions = [
    { label: "Sale", value: "sale"}
  ];

    const handlePostClick = async (event) => {
      event.preventDefault();
      console.log("post clicked");
    
      try {
        const blobName = `${Date.now()}-${file.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
        // Upload file to Azure Blob Storage
        await blockBlobClient.uploadBrowserData(file);
    
        // Get the URL of the uploaded file
        const imageUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    
        // Prepare data for POST request
        const postData = {
          Title: title,
          Caption: caption,
          Media: imageUrl,
          mediaType: mediaType,
          PlatformName: selectedPlatforms.map(platform => platform.value),
          Status: postType === 'now' ? 'Posted' : 'Scheduled',
          scheduledDate: postType === 'schedule' ? new Date(scheduleTime).toISOString() : null,
          createdAt: new Date().toISOString(),
        };
    
        // Make POST request to your API
        const apiUrl = 'http://localhost:4000/posts';
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
    
        if (!response.ok) {
          throw new Error('Failed to post content');
        }
    
        const data = await response.json();
        console.log('Post response:', data);
    
        if (postType === 'now') {
          alert('Content successfully posted');
          window.location = '/';
        } else {
          alert('Post is scheduled for: ' + scheduleTime);
          window.location.href = 'http://localhost:3000/calendar';
        }
      } catch (error) {
        console.error('Error posting content:', error);
        alert('Failed to post content. Please try again later.');
      }
    };
    
    const confirmLogout = () => {
      const confirmLogout = window.confirm('Are you sure you want to log out?');
      if (confirmLogout) {
        window.location.href = 'login.html';
      }
    };

    //const setText = (correctedText) => {
      //setCaption(correctedText);
    //};

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      setShowCorrectedText(false);
    
      try {
        const response = await axios.post('http://localhost:5000/chat', { text: caption });
        const correctedText = response.data;
        setCorrectText(correctedText);
        setShowCorrectedText(true);
        setIsCorrectedTextApplied(true);
        //setText(correctedText);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
      setButtonVisible(false);

    };
    
    return (
      <div>
      <div className="side-nav">
      <div className="logo">
        <img src={logo} className="user-img" alt="Logo" />
        <h2>socialsavvy</h2>
      </div>
      <ul className="menu">
        <li><a className='a' href="http://localhost:3000/dashboard"><img src={dashboardIcon} alt="Dashboard" /><p>Dashboard</p></a></li>
        <li className="active"><a className='a' href="http://localhost:3000/post"><img src={postIcon} alt="Post" /><p>Post</p></a></li>
        <li><a className='a' href="http://localhost:3000/calendar"><img src={calendarIcon} alt="Calendar" /><p>Calendar</p></a></li>
        <li><a className='a' href="http://localhost:3000/analysis"><img src={analysisIcon} alt="Analysis" /><p>Analysis</p></a></li>
        <li><a className='a' href="http://localhost:3000/ContentAnalysis"><img src={flameIcon} alt="Viral Content" /><p>Viral Content</p></a></li>
        <li><a className='a' href="http://localhost:3000/subscriptions"><img src={paymentIcon} alt="Subscription" /><p>Subscription</p></a></li>
        <li><a className='a' href="http://localhost:3000/settings"><img src={settingsIcon} alt="Settings" /><p>Settings</p></a></li>
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
                  <a href="http://localhost:3000/faq">FAQ</a>
                  <a href="http://localhost:3000/feedback">Feedback</a>
                  <a href="http://localhost:3000/helpdesk">Help Desk</a>
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
          <h2>Create New Post</h2>
          <div className="createpost-row">
            <div className="column">
              <div className="preview-button">
                <div className="text">Preview:</div>
                <button className="btn" onClick={handleButtonClick}><i className="bi bi-instagram"></i></button>
                <button className="btn" onClick={handleButtonClick}><i className="bi bi-facebook"></i></button>
              </div>

              <div className="create-content-tools">
                <div className="preview-post">

                  <div className="profile">
                    <img src={UserPic} alt="User" />
                    <p className="username-createpost">username</p>
                  </div>

                  <div id="content-media">
                    {mediaType === 'image' ? (
                      <img id="media" src={media} alt="Preview" width="400px" style={{ maxHeight: '400px' }} />
                    ) : (
                      <video id="media" src={url} controls width="400px" style={{ maxHeight: '400px' }} />
                    )}
                  </div>

                  <div className="content-caption">
                    <p>
                      <span id="caption-username">username</span>
                      <span id="dynamic-caption">{" " + caption}</span>
                    </p>
                  </div>

                </div>
              </div>
            </div>

            <div className="edit-content">
              <form>
                <label htmlFor="platform" className="label-choose-draft">Draft:</label><br />
              <Select
                options={draftsOptions}
                isMulti={false}
                value={selectedDraft}
                onChange={handlePlatformChange}
              /><br />
                <label htmlFor="platform" className="label-choose-platform">Publish to:</label><br />
              <Select
                options={platformsOptions}
                isMulti={true}
                value={selectedPlatforms}
                onChange={handlePlatformChange}
              />
                <label htmlFor="title">Content Title: </label>
                <input type="text" name="title" id="content-title" onChange={e => setTitle(e.target.value)}/>
                <fieldset>
                  <div>
                    <label htmlFor="input-caption" className="label-input-caption">Caption:</label><br />
                    <textarea id="input-caption" title="input-caption" rows="5" 
                    value={caption} onChange={e => setCaption(e.target.value)} />
                    <button onClick={handleSubmit} disabled={isLoading} style={{ display: buttonVisible ? "block" : "none" }}>
                    {/*spell checker*/}
                    {isLoading ? 'Correcting...' : 'Correct Text'}
                  </button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  {showCorrectedText && (
                  <div className="corrected-text-container">
                    <h5>Corrected Text:</h5>
                    <p>{correctText}</p>
                    <button
                      onClick={() => {
                        setCaption(correctText);
                        setShowCorrectedText(false);
                      }}
                    >
                      Apply Changes
                    </button>
                  </div>
                )}
                    <br />
                  </div>
                  <div>
                    <label htmlFor="add-media" className="label-add-media">Media</label><br />
                    <div className="content-input-media">
                      <input id="add-media" type="file" accept="image/*,video/*" onChange={handleMediaChange} />
                      <div className="media-preview-gallery">
                          {mediaType === 'image' ? (
                              <img id="imagePreview" src={media} alt="Preview" width="50px" height="50px" />
                          ) : (
                              <img id="videoThumbnail" src={media} alt="Video Thumbnail" width="50px" height="50px" />
                          )}
                      </div>
                  </div>

                  </div>
                </fieldset>

                <div className="schedule-post">
                  <div className="postType">
                    <label htmlFor="post-type">Select post type:</label>
                    <select id="post-type" value={postType} onChange={e => setPostType(e.target.value)}>
                      <option value="draft">Save as Draft</option>
                      <option value="now">Post Now</option>
                      <option value="schedule">Schedule Post</option>
                    </select>
                  </div>
                  {postType === 'schedule' && (
                    <div id="schedule-input">
                      <label htmlFor="schedule-time">Schedule Time:</label>
                      <input type="datetime-local" id="schedule-time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} />
                    </div>
                  )}
                  <button id="post-button" type="submit" onClick={handlePostClick}>Confirm</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default CreatePost;
