import authMiddleWare from "../middlewares/auth.js";
import express from 'express'
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/OrderController.js";


const orderRouter = express.Router();


orderRouter.post("/place",authMiddleWare,placeOrder);
orderRouter.post('/verify',verifyOrder)
orderRouter.post("/userorders",authMiddleWare,userOrders);
orderRouter.post("/list",listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;