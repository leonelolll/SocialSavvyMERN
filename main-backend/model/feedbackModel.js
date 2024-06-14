import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    image:{
        type: String,
        required : true,
        default : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },
    name:{
        type : String,
        required : true
    },
    username:{
        type: String,
        required : true,
    },
    rating:{
        type : Number,
        required : true
    },
    comment:{
        type:String,
        required : true
    }
});

export default mongoose.model("feedback", feedbackSchema)