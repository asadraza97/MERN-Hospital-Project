import express from "express"
import { getAllMessage, sendMessage } from "../controller/messageController.js";
import{ isAdminAuthentication} from "../middleware/auth.js"
const router = express.Router();

router.post("/send" , sendMessage)
router.get("/getall" , isAdminAuthentication , getAllMessage)

export default router