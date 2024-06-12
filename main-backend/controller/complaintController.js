import Complaint from "../model/complaintModel.js";

export const createComplaint = async(req, res) =>{
    try {
        const date = new Date().toISOString().split('T')[0];
        const lastComplaint = await Complaint.findOne().sort({ ticketNo: -1 });
        const ticketNo = lastComplaint ? lastComplaint.ticketNo + 1 : 101;
        const newComplaint = new Complaint({
            ...req.body,
            date,
            ticketNo
        });
        const {title} = newComplaint;

        const complaintExist = await Complaint.findOne({title})
        if(complaintExist){
            return res.status(400).json({messgae : "Complaint already exists." });
        }

        const savedData = await newComplaint.save();
        res.status(200).json({message:"Complaint created successfully!"});

    } catch (error) {
        console.error('Error creating complaint:', error);
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getAllComplaints = async(req, res) =>{
    try {
        const complaintData = await Complaint.find();
        if(!complaintData || complaintData.length === 0){
            return res.status(404).json({message: "Complaint data not found. "});
        }
        res.status(200).json(complaintData);
        
    } catch (error) {
        res.status(500).json({ errorMessage: error.message});
        
    }
};

export const getComplaintById = async(req, res) =>{
    try {
        const id = req.params.id;
        const complaintExist = await User.findById(id);
        if(!complaintExist){
            return res.status(404).json({message: "Complaint not found. "});
        }
        res.status(200).json(complaintExist);
        
    } catch (error) {
        res.status(500).json({ errorMessage: error.message});

    }
};

export const deleteComplaint = async(req, res) =>{
    try {
        const id = req.params.id;
        const complaintExist = await Complaint.findById(id);
        if(!complaintExist){
            return res.status(404).json({message: "Complaint not found. "});
        }
        await Complaint.findByIdAndDelete(id);
        res.status(200).json({message:"Complaint deleted successfully!"});
        
    } catch (error) {
        res.status(500).json({ errorMessage: error.message});
    }
};

export const sendEmail = async(req, res) =>{
    try {
        const { emailData } = req.body;
    
        const info = await transporter.sendMail(emailData);
        console.log("Email sent:", info.messageId);
        res.json({ message: "Email sent successfully." });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email." });
      }
};