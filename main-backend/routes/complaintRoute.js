import express from "express";
import { createComplaint, getAllComplaints, getComplaintById, deleteComplaint, sendEmail} from '../controller/complaintController.js'

const route = express.Router();

route.post("/createComplaint", createComplaint)
route.get("/complaints",getAllComplaints);
route.get("/complaint/:id",getComplaintById);
route.delete("/delete/complaint/:id",deleteComplaint);
route.get("/send-email", sendEmail)

export default route;