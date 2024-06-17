import express from "express"
import { deleteAppointments, getAllAppointments, postAppointment, updateAllAppointments } from "../controller/appointmentController.js";
import { isAdminAuthentication, ispatientAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/post",ispatientAuthenticated, postAppointment);
router.get("/getall",isAdminAuthentication, getAllAppointments);
router.put("/update/:id",isAdminAuthentication, updateAllAppointments);
router.delete("/delete/:id",isAdminAuthentication, deleteAppointments);


export default router