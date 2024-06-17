import mongoose from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        minLength: [8, "Password Must contain At Least 8 Character!"],
        required: true,
        select: false
    },
    role:{
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment:{
        type: String,
    },
    docAvatar:{
        public_id: String,
        url: String,
    },
});
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password= await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJsonWebToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema)