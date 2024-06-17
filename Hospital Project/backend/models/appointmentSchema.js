import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: [3, "First Name Must contain At Least 3 Character!"]
    },
    lastname: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must contain At Least 3 Character!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide a valid Email!"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "Phone Number Must contain At Least 11 Character!"],
        maxLength: [11, "Phone Number Must contain At Least 11 Character!"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "NIC Must contain At Least 13 Digit!"],
        maxLength: [13, "NIC Must contain At Least 13 Digit!"],

    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    appointment_date: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    hasVisited: {
        type: Boolean,
        required:false
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending","Accepted", "Rejected"],
        default: "Pending"
    },
})

export const Appointment = mongoose.model("Appointment", appointmentSchema)