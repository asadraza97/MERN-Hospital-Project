import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken"

// Authorization Function use //

export const isAdminAuthentication =catchAsyncError(async(req,res,next)=>{
     const token = req.cookies.adminToken
     if(!token){
    return next(new ErrorHandler("Admin Not Authentication..!" , 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id)

// Authenticaion Function use
    if(req.user.role !== "Admin"){
        return next(
            new ErrorHandler(
                `${req.user.role} not Authorized for this resources..!` , 403))
    }
//
next()
})


export const ispatientAuthenticated =catchAsyncError(async(req,res,next)=>{
    const token = req.cookies.patientToken
    if(!token){
   return next(new ErrorHandler("Patient Not Authentication..!" , 400))
   }
   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
   req.user = await User.findById(decoded.id)

// Authenticaion Function use

   if(req.user.role !== "Patient"){
       return next(
           new ErrorHandler(
               `${req.user.role} not authorized for this resources..!` , 403))
   }
//

next()
})