import express from "express"
import { addNewAdmin, addNewDoctors, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import {isAdminAuthentication, ispatientAuthenticated} from "../middleware/auth.js"


const router = express.Router();

router.post("/patient/register" , patientRegister)
router.post("/login" , login)
// router.post("/admin/addnew" , addNewAdmin)
router.post("/admin/addnew" , isAdminAuthentication, addNewAdmin)
router.get("/doctors" , getAllDoctors)
router.get("/admin/me" , isAdminAuthentication ,getUserDetails)
router.get("/patient/me" , ispatientAuthenticated ,getUserDetails)
router.get("/admin/logout" , isAdminAuthentication, logoutAdmin)
router.get("/patient/logout" , ispatientAuthenticated, logoutPatient)
router.post("/doctor/addnew" , isAdminAuthentication, addNewDoctors)

export default router