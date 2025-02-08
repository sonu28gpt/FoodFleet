import dotenv from 'dotenv';
dotenv.config({
    path:'./.env'
});
import express  from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"

import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 5000;


// middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const allowedOrigins=[process.env.FRONTEND_URL,"http://localhost:5174"]
app.use(cors(
  {
    origin:function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error("Not allowed by CORS"));
      }
      } , // Yahan apni frontend URL do
    credentials: true,               // Cookies aur authentication headers allow karega
}
))



// for proxy render for cookie
app.set("trust proxy", 1);



app.use(express.static('pubic'))

// db connection


// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

  connectDB()
  .then(()=>{

    app.listen(port, () => {console.log(`Server started on http://localhost:${port}`)})
    // console.log(process.env.CLOUDINARY_CLOUD_NAME)
    //     console.log(process.env.CLOUDINARY_API_KEY)
    //     console.log(process.env.CLOUDINARY_API_SECRET)
  })
  .catch((e)=>{
    console.log(e)
  })