import authMiddleWare from "../middlewares/auth.js";
import express from 'express'
import { placeOrder } from "../controllers/OrderController.js";


const orderRouter = express.Router();


orderRouter.post("/place",authMiddleWare,placeOrder);

export default orderRouter;