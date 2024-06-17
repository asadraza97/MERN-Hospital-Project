import { catchAsyncError } from "../middleware/catchAsyncError.js";
import {Message} from "../models/messageSchema.js"
import ErrorHandler from "../middleware/errorMiddleware.js"

export const sendMessage = catchAsyncError(async(req,res,next)=>{
    const {firstname, lastname, email, phone, message} =req.body;
    if(!firstname || !lastname || !email || !phone || !message){
        return next(new ErrorHandler("Please fill full form", 400))
    }
        await Message.create({firstname, lastname, email, phone, message});
        res.status(200).json({
            success: true,
            message: "Message Send Successfully"
        })
})

export const getAllMessage = catchAsyncError(async(req,res,next)=>{
    const messages =await Message.find();
        res.status(200).json({
            success: true,
            messages
        })
})