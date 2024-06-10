import FAQ from "../model/queAns.js";

export const create = async(req, res) =>{
    try {
        const newFAQ = new FAQ(req.body);
        const savedData = await newFAQ.save();
        res.status(200).json(savedData);
        // res.status(200).json({message:"Question created successfully!"});

    } catch (error) {
        res.status(500).json({errorMessage:error.message})
    }
};

export const getAllFaqs = async (req, res) => {
    try {
        const faqData = await FAQ.find();
        console.log("FAQ Data:", faqData); 
        if (!faqData || faqData.length === 0) {
            return res.status(404).json({ message: "Data not found." });
        }
        return res.status(200).json({ faqs: faqData });
    } catch (error) {
        console.error("Error:", error); 
        return res.status(500).json({ errorMessage: error.message });
    }
};