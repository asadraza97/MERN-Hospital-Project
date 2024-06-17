import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        minLength: [10, "Message Must contain At Least 10 Characters!"],
    },
})

export const Message = mongoose.model("Message", messageSchema)