import Feedback from "../model/feedbackModel.js";

export const createFeedback = async(req, res) =>{
    try {
        const { name, username, rating, comment } = new Feedback(req.body);
        const newFeedback = new Feedback({ name, username, rating, comment });
        const savedData = await newFeedback.save();
        res.status(200).json({message:"Thank you for your feedback!", data: savedData });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const getAllFeedback = async (req, res) => {
    try {
        const feedbackData = await Feedback.find();
        if (!feedbackData || feedbackData.length === 0) {
            return res.status(404).json({ message: "Data not found." });
        }
        /* return res.status(200).json({ feedback: feedbackData }); */
        res.json(feedbackData); // Ensure this is an array
    } catch (error) {
        console.error("Error:", error); 
        return res.status(500).json({ errorMessage: error.message });
    }
};