const User = require('../models/User');
const Post = require('../models/Post');
const Engagement = require('../models/Engagement');
const axios = require('axios');

const saveTikTokData = async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Replace this with the actual TikTok API endpoints and headers
  const tiktokApiUrl = `https://api.tiktok.com/user_data/${username}`;

  try {
    const response = await axios.get(tiktokApiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.TIKTOK_API_KEY}`
      }
    });

    const data = response.data;

    const user = new User({ userName: username });
    await user.save();

    for (const item of data.posts) {
      const newPost = new Post({
        userId: user._id,
        caption: item.caption,
        media: item.media_type,
        platform: 'tiktok',
        dateTime: new Date(item.create_time * 1000),
      });

      await newPost.save();

      const engagement = new Engagement({
        postId: newPost._id,
        postLikes: item.like_count,
        postComments: item.comment_count,
        postShares: item.share_count,
      });

      await engagement.save();
    }

    res.status(200).json({ message: 'TikTok data saved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching TikTok data', error: error.message });
  }
};

module.exports = {
  saveTikTokData,
};
