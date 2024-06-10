import Feedback from "../model/feedbackModel.js";

export const createFeedback = async(req, res) =>{
    try {
        const newFeedback = new Feedback(req.body);
        const savedData = await newFeedback.save();
        res.status(200).json(savedData);
        res.status(200).json({message:"Thank you for your feedback!"});

    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
};

export const getAllFeedback = async (req, res) => {
    try {
        const feedbackData = await Feedback.find();
        console.log("Feedback Data:", feedbackData); 
        if (!feedbackData || feedbackData.length === 0) {
            return res.status(404).json({ message: "Data not found." });
        }
        return res.status(200).json({ feedback: feedbackData });
    } catch (error) {
        console.error("Error:", error); 
        return res.status(500).json({ errorMessage: error.message });
    }
};