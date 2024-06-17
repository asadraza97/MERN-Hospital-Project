import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js"
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary"
export const patientRegister = catchAsyncError(async(req,res,next)=>{
    const {firstname, lastname, email, phone, password, gender,  dob, nic, role} =req.body;
    if(!firstname || !lastname || !email || !phone || !password || !gender || !dob || !nic || !role ){
        return next(new ErrorHandler("Please fill full form", 400))
    }
       let user = await User.findOne({email});
        if(user){
            return next(new ErrorHandler("User Already Register", 400))

        }
        user = await User.create({firstname, lastname, email, phone, password, gender, dob, nic, role});
        generateToken(user, "User Registered..!", 200, res)
})

export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password,confirmPassword, role} =req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide All Detail", 400))
    }
    if( password !== confirmPassword){
        return next(new ErrorHandler("Password and Confirm password do not match", 400))
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Password or Email", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or Email", 400))
    }
    if(role !== user.role){
        return next(new ErrorHandler("User with this role Not Found", 400))
    }
    generateToken(user, "User Logged In Sucessfully..!", 200, res)
});

export const addNewAdmin = catchAsyncError(async(req,res,next)=>{
    const { firstname, lastname, email, phone, password, gender,  dob, nic  } =req.body

    if(!firstname || !lastname || !email || !phone || !password || !gender || !dob || !nic ){
        return next(new ErrorHandler("Please fill full form", 400))
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(`${isRegistered.role} with this email is Already Exist`))
    }
    const admin = await User.create({
        firstname, lastname, email, phone, password, gender,  dob, nic ,role:"Admin"
    });
    res.status(200).json({
        success: true,
        message: "New Admin Register..!"
    })
})


export const getAllDoctors = catchAsyncError(async(req,res,next)=>{
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors
    })
})

export const getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
       user,
    })
})

export const logoutAdmin = catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin Logged out Successfully"
    })
}) 

export const logoutPatient= catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient Logged out Successfully"
    })
})


export const addNewDoctors= catchAsyncError(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length === 0 ){
        return next(new ErrorHandler("Doctor Avatar Required", 400));

    }
    const {docAvator} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp" ]
    if(!allowedFormats.includes(docAvator.mimetype)){
        return next(new ErrorHandler("File Format Not Supported",400));

    }
    const { firstname, lastname, email, phone, password, gender,  dob, nic, doctorDepartment} = req.body;
    if(!firstname || !lastname || !email || !phone|| !password || !gender ||  !dob || !nic || !doctorDepartment){
        return next(new ErrorHandler("Please Provide full details", 400));
    }
    const isRegistered =await User.findOne({email});
    if(isRegistered){
        return next(new ErrorHandler(  `${isRegistered.role} already register with this email`,400));

    }
    const cloudinaryResponse= await cloudinary.uploader.upload(docAvator.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
    }
    const doctor =await User.create({
        firstname, lastname, email, phone, password, gender,  dob, nic, doctorDepartment,role: "Doctor", docAvatar :{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url ,
        },
    });
    res.status(200).json({

        success: true,
        message: "New Doctor Registered..!",
        doctor
    })
})


