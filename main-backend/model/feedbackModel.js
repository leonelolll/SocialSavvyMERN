import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true,
    },
    rating:{
        type : String,
        required : true
    },
    comment:{
        type:String,
        required : true
    }
});

export default mongoose.model("feedback", feedbackSchema)