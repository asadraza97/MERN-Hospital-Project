import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js"
import { User } from "../models/userSchema.js";
import { Appointment } from "../models/appointmentSchema.js";


export const postAppointment = catchAsyncError(async(req,res,next)=>{
    const {firstname, lastname, email, phone,gender,  dob, nic, appointment_date,department, doctor_firstname, doctor_lastname,hasVisited, address} =req.body;

    if(!firstname || !lastname || !email || !phone || !gender || !dob || !nic || !appointment_date || !department || !doctor_firstname || !doctor_lastname || !address){
        return next(new ErrorHandler("Please fill full form", 400))
    }
       let isConflict = await User.find({ 
       firstname: doctor_firstname,
       lastname: doctor_lastname,
       role: "Doctor",
       doctorDepartment: department
       });

        if(isConflict.length === 0 ){
            return next(new ErrorHandler("Doctor Not Fount..!", 404))

        }
        if(isConflict.length > 1 ){
            return next(new ErrorHandler("Doctors Conflict! Please Contact through Email or Phone..!", 404))
        }

        const doctorId = isConflict[0]._id;
        const patientId = req.user._id;
        const appointment = await Appointment.create({
            firstname, lastname, email, phone,gender,  dob, nic, appointment_date,department,
            doctor:{
                firstname: doctor_firstname,
                lastname:doctor_lastname
            },
            hasVisited,
            address,
            doctorId, 
            patientId
        });
        res.status(200).json({
            success: true,
            message: "Appointment Sent Successfully..!",
        })
});


export const getAllAppointments = catchAsyncError(async(req,res,next)=>{
        const appointment = await Appointment.find();
        res.status(200).json({
            success : true,
            appointment,
        })
})

export const updateAllAppointments = catchAsyncError(async(req,res,next)=>{
    const {id}= req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found..!", 404))
    }
    appointment =await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success : true,
        message: "Appointment Status updated..!",
        appointment,
    })
})

export const deleteAppointments = catchAsyncError(async(req,res,next)=>{
    const {id}= req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment){
        return next(new ErrorHandler("Appointment Not Found..!", 404))
    }
   await appointment.deleteOne();
    res.status(200).json({
        success : true,
        message: "Appointment Deleteed..!",
    })
})