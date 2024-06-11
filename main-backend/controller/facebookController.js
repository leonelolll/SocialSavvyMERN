const User = require('../models/User');
const Post = require('../models/Post');
const Engagement = require('../models/Engagement');
const axios = require('axios');

const saveFacebookData = async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Replace this with the actual Facebook API endpoints and headers
  const facebookApiUrl = `https://graph.facebook.com/${username}/posts`;

  try {
    const response = await axios.get(facebookApiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.FACEBOOK_API_KEY}`
      },
      params: {
        fields: 'message,created_time,likes.summary(true),comments.summary(true),shares'
      }
    });

    const data = response.data;

    const user = new User({ userName: username });
    await user.save();

    for (const item of data.data) {
      const newPost = new Post({
        userId: user._id,
        caption: item.message,
        media: 'text', // Change as needed
        platform: 'facebook',
        dateTime: new Date(item.created_time),
      });

      await newPost.save();

      const engagement = new Engagement({
        postId: newPost._id,
        postLikes: item.likes.summary.total_count,
        postComments: item.comments.summary.total_count,
        postShares: item.shares ? item.shares.count : 0,
      });

      await engagement.save();
    }

    res.status(200).json({ message: 'Facebook data saved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Facebook data', error: error.message });
  }
};

module.exports = {
  saveFacebookData,
};
