import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import { upload } from '../middleware/multer.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Console } from 'console';
const foodRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

// const storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         return cb(null,`${Date.now()}${file.originalname}`);
//     }
// })

// const upload = multer({ storage: storage})

foodRouter.get("/list",listFood);
foodRouter.post("/add",upload.single('image'),addFood);
// foodRouter.post("/add",upload.single('image'),async(req,res)=>{
//     try{
//         console.log(req.body)
//         console.log(req?.file?.path);
//         const image=await uploadOnCloudinary(req?.file?.path,"FoodFleetFoodImages")
     
//         console.log(image?.url)
//         res.status(200).json({data:"success"});
//     }catch(e){
//         console.log(e?.message)
//     }
// });
foodRouter.post("/remove",removeFood);

export default foodRouter;