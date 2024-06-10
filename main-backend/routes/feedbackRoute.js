import express from "express";
import { createFeedback, getAllFeedback} from '../controller/feedbackController.js'

const route = express.Router();

route.post("/createFeedback", createFeedback);
route.get("/feedback",getAllFeedback);

export default route;