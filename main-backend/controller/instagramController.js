const User = require('../model/User');
const Post = require('../model/Post');
const Engagement = require('../model/Engagement');
const axios = require('axios');

// Fetch the Instagram username from the database
const getUsername = async (req, res) => {
  try {
    const user = await User.findOne(); // Fetching the first user for simplicity
    if (user) {
      res.json({ username: user.userName });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const saveInstagramData = async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const userIdApiUrl = 'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/user_id_by_username';
  const postsApiUrl = 'https://instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com/posts_by_user_id';

  try {
    // Fetch the user ID using the username
    const userIdResponse = await axios.get(userIdApiUrl, {
      params: { username: username },
      headers: {
        'x-rapidapi-key': 'b00789694emsh658c754e810a688p19156ajsn9599375128f7',
        'x-rapidapi-host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
      },
    });

    const userId = userIdResponse.data.User_Id;

    // Fetch the posts using the user ID
    const postsResponse = await axios.get(postsApiUrl, {
      params: { user_id: userId },
      headers: {
        'x-rapidapi-key': 'b00789694emsh658c754e810a688p19156ajsn9599375128f7',
        'x-rapidapi-host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com',
      },
    });

    const data = postsResponse.data;

    // Save User Data
    const user = new User({
      userName: username,
    });

    await user.save();

    // Save Post Data and Engagement Data
    for (const item of data) {
      const newPost = new Post({
        userId: user._id,
        caption: item.caption.text,
        media: item.media_type,
        platform: 'instagram',
        dateTime: new Date(item.taken_at * 1000), // Convert timestamp to Date object
      });

      await newPost.save();

      // Save Engagement Data
      const engagement = new Engagement({
        postId: newPost._id,
        postLikes: item.like_count,
        postComments: item.comment_count,
        postShares: item.reshare_count,
      });

      await engagement.save();
    }

    res.status(200).json({ message: 'Data saved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Instagram data', error: error.message });
  }
};

const getTargetValues = async (req, res) => {
  try {
    const user = await User.findOne(); // Fetching the first user for simplicity
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch all posts from the database
    const posts = await Post.find({ userId: user._id });

    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;
    for (const post of posts) {
      totalLikes += post.postLikes;
      totalComments += post.postComments;
      totalShares += post.postShares;
    }
    const totalInsta = totalComments + totalLikes + totalShares;
    // Prepare data for the charts
    const labels = posts.map((post, index) => `Post ${index + 1}`);
    const likes = posts.map(post => post.postLikes);
    const comments = posts.map(post => post.postComments);
    const shares = posts.map(post => post.postShares);

    // Return the data
    res.json({
      likesTarget: totalLikes,
      commentsTarget: totalComments,
      sharesTarget: totalShares,
      chartData1: {
        labels,
        likes,
        comments,
        shares,
      },
      chartData2: {
        totalInsta, 
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsername,
  saveInstagramData,
  getTargetValues,
};
