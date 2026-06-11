import express from 'express'
import { createUser, getUserById, loginUser, logoutUser, verifyOTP } from '../Controller/UserController.js'


const UserRoutes=express.Router()
UserRoutes.post("/register", createUser);
UserRoutes.post("/verify-otp", verifyOTP);
UserRoutes.post("/login", loginUser);
UserRoutes.get("/logout",logoutUser)
UserRoutes.get("/:id", getUserById);
export default UserRoutes