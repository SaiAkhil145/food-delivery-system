import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect(process.env.mongo_server)
    .then(()=>console.log("db connected"))
}