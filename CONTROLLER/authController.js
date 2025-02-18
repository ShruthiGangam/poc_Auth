import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import doctor_auth from "../MODLES/doctorModel.js";  
import patient_auth from "../MODLES/patientModel.js";  


const loginDoctor=async (req,res)=>{
    try{
        const {doctor_id,password}= req.body;
        
        const user= await doctor_auth.findOne({doctor_id:doctor_id})
        
        if(!user){
            res.status(404).json({message:`doctor not found`})
        }
        const isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch){
        res.status(400).json({ message: "invalid credentials" })
        }

        const token= jwt.sign(
            {id:user.doctor_id,role:"doctor"},
            process.env.TOKEN,
            {expiresIn:"1h"}
        )

        res.status(200).json({token})
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
}

const loginPatient=async (req,res)=>{
    try{
        const {patient_id,password}= req.body;
        
        const user= await patient_auth.findOne({patient_id:patient_id})
        if(!user){
          return  res.status(404).json({message:`patient not found`})
        }
        console.log("password",password)
        console.log("user.password",user.password)
        const isMatch =(password === user.password);//await bcrypt.compare(password,user.password)
        if(!isMatch){
        return res.status(400).json({ message: "invalid credentials" })
        }

        const token= jwt.sign(
            {id:user.patient_id,role:"patient"},
            process.env.TOKEN,
            {expiresIn:"1h"}
        )

        res.status(200).json({token:token})
    }catch(err){
        console.error(err)
        res.status(500).json({ message: "Server error" });
    }
}

export {loginPatient,loginDoctor }