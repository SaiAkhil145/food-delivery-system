import mongoose from 'mongoose'


const OrderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"food processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
});

const orderModel = mongoose.models.roder || mongoose.model("order",OrderSchema);
export default orderModel;