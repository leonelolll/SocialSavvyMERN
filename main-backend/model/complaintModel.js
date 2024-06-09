import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    ticketNo:{
        type: Number,
        required : true,
        unique: true // Ensure ticketNo is unique
    },
    date:{
        type : String, // Storing date as a string in YYYY-MM-DD format
        required : true
    },
    title:{
        type:String,
        required : true
    },
    description:{
        type:String,
        required : true
    }
})

export default mongoose.model("complaint", complaintSchema)