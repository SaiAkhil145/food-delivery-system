import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // save order to DB
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

export { placeOrder };
