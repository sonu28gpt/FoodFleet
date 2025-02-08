import foodModel from "../models/foodModel.js";
import fs from "fs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.aggregate([
      {$match:{}}
    ]);
    // console.log(foods)
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" ,data:[]});
  }
};

// add food
const addFood = async (req, res) => {
  try {
    // let image_filename = `${req.file.filename}`;
    const imageLocalPath=req?.file?.path;
    if(!imageLocalPath){
      return res.status(400).json({data:"image is required"});
    }
    const image=await uploadOnCloudinary(imageLocalPath,"FoodFleetFoodImages")
    if(!image?.url){
      return res.status(500).json({data:" something went wrong when image is uploading"});
      
    }
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image.url,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// delete food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listFood, addFood, removeFood };
