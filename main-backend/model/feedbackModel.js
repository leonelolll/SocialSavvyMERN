import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    image:{
        type: String,
        required : true,
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