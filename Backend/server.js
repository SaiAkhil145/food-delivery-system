import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/UserRoute.js';
import 'dotenv/config'
import cartRouter from './routes/CartRoute.js';
import orderRouter from './routes/OrderRoute.js';

//app config

const app = express();
const port = 8000;

//middleware 

app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api endpoints

app.use('/api/food',foodRouter)
app.use("/images",express.static("uploads"))
//user
app.use("/api/user",userRouter);
//cart
app.use("/api/cart",cartRouter)

//order route
app.use('/api/order/',orderRouter)


app.get("/",(req,res)=>{
    res.send("api working")
});
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})


//mongodb+srv://sairevu1:47709293@cluster0.xwh9uip.mongodb.net/?