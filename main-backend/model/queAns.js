import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    section:{
        type:String,
        required : true
    },
    question:{
        type:String,
        required : true
    },
    anwser:{
        type:String,
        required : true
    }
}, { versionKey: false} );

export default mongoose.model("SocialSavvy", faqSchema, "FAQs");