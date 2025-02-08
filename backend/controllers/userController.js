import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:'1h'});
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email address"})
        }
        // if(password.length<8|| !validator.isStrongPassword(password)){
        //     return res.json({success:false,message: "Please enter a strong password"})
        // }
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        const options={
            httpOnly: true,  // JavaScript access nahi karega
            secure: true,   // Sirf HTTPS ke liye nahi, HTTP me bhi allow
            sameSite: "none",
            maxAge:3600000
        }
       return res.status(200).cookie("token",token,options).json({success:true,token})
        // res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
       
        if(!name.trim()){

            return res.json({success:false,message: "Please enter a valid name"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email address"})
        }
        if(password.length<8|| !validator.isStrongPassword(password)){
            return res.json({success:false,message: "Please enter a strong password"})
        }
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save();
        const token = createToken(user._id);
        const options={
            httpOnly: true,  // JavaScript access nahi karega
            secure: true,   // Sirf HTTPS ke liye nahi, HTTP me bhi allow
            sameSite: "strict",
            maxAge:3600000
        }
        res.status(200).cookie("token",token,options).json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:(error?.message||"Error at registering user")})
    }
}

export const logOutUser=async(req,res)=>{
    try{
            let {userId}=req.body;
                if(!userId){
                    return res.json({success:false,message: "Please enter a valid user"})
                }
                let user=await userModel.findById(userId);
                if(!user){
                    return res.json({success:false,message: "user does not exist"})

                }
                const options={
                    httpOnly: true,  // JavaScript access nahi karega
                    secure: true,   // Sirf HTTPS ke liye nahi, HTTP me bhi allow
                    sameSite: "strict",
                   
                }

                return res.status(200).clearCookie("token",options).json({success:true,message:"user log out successfully"});

    }catch(err){
        
        console.log(err);
        res.json({success:false,message:(err?.message||"Error at logOut user")})
    }
}
export {loginUser, registerUser}