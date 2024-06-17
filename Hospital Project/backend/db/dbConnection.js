import mongoose from "mongoose";

export const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "HOSPITAL_PRACTICE"
    }).then(()=>{
        console.log("connected to db");
    }).catch(err =>{
        console.log(`some error occur while connected to db ${err}`);
    })
} 