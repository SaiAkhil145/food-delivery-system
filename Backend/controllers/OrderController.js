import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // clear user cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // create Stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100*2, 
      },
      quantity: item.quantity, 
    }));

    // add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 2, // ₹2 delivery charge
      },
      quantity: 1,
    });

    // create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.json({ success: false, message: "Error creating checkout session" });
  }
};

const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body;
    try {
        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:true,message:"not paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
}

//user orders for frontend


const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}



//listing order for admin panel

const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
}
//api for order status
const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"status updated"});
    } catch (error) {
        console.log({success:false,message:"Error"})
    }
}   

export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus };
