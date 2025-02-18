import express from "express"
import {loginPatient,loginDoctor} from "../CONTROLLER/authController.js"
const authRouter=express.Router();

authRouter.post("/patient",loginPatient)
authRouter.post("/doctor",loginDoctor)

export default authRouter