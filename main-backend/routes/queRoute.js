import express from "express";
import { getAllFaqs, create} from "../controller/queController.js";

const route = express.Router();

route.post("/createFAQ", create);
route.get("/faqs",getAllFaqs);

export default route;