import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Select from 'react-select';
import './createpost.css';
import { BlobServiceClient } from '@azure/storage-blob';

function CreatePost() {
  const [platforms, setPlatforms] = useState([]);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState('../images/previewimage.jpg');
  const [mediaType, setMediaType] = useState('image'); // Added state for media type
  const [postType, setPostType] = useState('now');
  const [scheduleTime, setScheduleTime] = useState('');
  const [url, setUrl] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // State for selected platforms
  const [file, setFile] = useState(null);

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
  const options = [
    { label: "Facebook", value: "facebook" },
    { label: "Instagram", value: "instagram" },
    { label: "Twitter", value: "twitter" },
    { label: "Linkedin", value: "linkedin" },
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
    
    
    return (
      <div>
      
        <div className="container">
          <h2>Create New Post</h2>
          <div className="row">
            <div className="column">
              <div className="preview-button">
                <div className="text">Preview:</div>
                <button className="btn" onClick={handleButtonClick}><i className="bi bi-instagram"></i></button>
                <button className="btn" onClick={handleButtonClick}><i className="bi bi-facebook"></i></button>
              </div>

              <div className="create-content-tools">
                <div className="preview-post">

                  <div className="profile">
                    <img src="../images/user.png" alt="User" />
                    <p className="username">username</p>
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
              <form><label htmlFor="platform" className="label-choose-platform">Publish to:</label><br />
              <Select
                options={options}
                isMulti={true}
                value={selectedPlatforms}
                onChange={handlePlatformChange}
              />
                <label htmlFor="title">Content Title: </label>
                <input type="text" name="title" id="content-title" onChange={e => setTitle(e.target.value)}/>
                <fieldset>
                  <legend className="content">Content</legend>
                  <div>
                    <label htmlFor="input-caption" className="label-input-caption">Caption:</label><br />
                    <textarea id="input-caption" title="input-caption" rows="5" value={caption} onChange={e => setCaption(e.target.value)} /><br />
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
  );
}

export default CreatePost;
