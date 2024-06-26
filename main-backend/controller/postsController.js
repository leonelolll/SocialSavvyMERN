import mongoose from 'mongoose';
import Post from '../model/Post.js';

// Get all posts
export const Get = async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving posts' });
    }
  };

// Create a new post
export const Create = async (req, res) => {
    const { Title, Caption, Media, mediaType,  PlatformName, Status, scheduledDate } = req.body;

if ( !Title || !Caption || !Media || !mediaType || !PlatformName || !Status) {
    return res.status(400).json({ message: 'All fields are required' });
}

const newPost = new Post({
    _id: new mongoose.Types.ObjectId(),
    Post_id: new mongoose.Types.ObjectId(),
    Title,
    Caption,
    Media,
    mediaType,
    PlatformName,
    Status,
    scheduledDate,
    createdAt: new Date(),
});

try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
} catch (error) {
    res.status(500).json({ message: 'Error saving post', error });
}
};

// Update a post
export const Update = async (req, res) => {
    try {
    const { title, caption, media, mediaType, platformName, status, scheduledDate } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { Title: title, Caption: caption, Media: media, mediaType, PlatformName: platformName, Status: status, scheduledDate, updatedAt: new Date() },
      { new: true }
    );
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.json(post);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Delete a post
export const Delete = async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).send('Server error');
    }
};