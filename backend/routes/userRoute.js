import express from 'express';
import { loginUser,logOutUser,registerUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/logOut",authMiddleware,logOutUser)

export default userRouter;