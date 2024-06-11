import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    // facebookId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
    // twitterId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
    // instagramId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
    // tiktokId: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    // },
    // tokens: {
    //   facebook: {
    //     type: String,
    //   },
    //   twitter: {
    //     type: String,
    //   },
    //   instagram: {
    //     type: String,
    //   },
    //   tiktok: {
    //     type: String,
    //   },
    // }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;