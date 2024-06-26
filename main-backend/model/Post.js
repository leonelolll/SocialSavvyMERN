// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    Post_id: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    Title: { type: String, required: true },
    Caption: { type: String, required: true },
    Media: { type: String, required: true },
    mediaType: { type: String, required: true },
    PlatformName: [{ type: String }],
    Status: { type: String, required: true },
    scheduledDate: { type: Date, required: function() { return this.Status === 'Scheduled'; } },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now } 
});

postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

const Post = mongoose.model('Post', postSchema);

export default Post;
