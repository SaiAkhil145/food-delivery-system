import mongoose, { Mongoose } from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description :{
            type:String,
            required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        requried:true
    },
    category:{
        type:String,
        requried:true
    }
})

const foodModel  =mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel;