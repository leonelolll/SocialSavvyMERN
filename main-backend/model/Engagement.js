const mongoose = require('mongoose');

const EngagementSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  postLikes: { type: Number, required: true },
  postComments: { type: Number, required: true },
  postShares: { type: Number, required: true },
});

module.exports = mongoose.model('Engagement', EngagementSchema);

