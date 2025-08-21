import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://sairevu1:47709293@cluster0.xwh9uip.mongodb.net/food-del-system')
    .then(()=>console.log("db connected"))
}