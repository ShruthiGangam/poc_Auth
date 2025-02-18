import express from "express";
import { getPatientDetails,createPatient,updatePatient,getPatientDetail,deletePatient } from "../CONTROLLER/patientController.js"
const doctorRoute= express.Router();
//import { validateToken } from "../midddleware/validateToken.js";


//router.use(validateToken)


doctorRoute.route('/').get(getPatientDetails).post(createPatient)
doctorRoute.route('/:id').put(updatePatient).get(getPatientDetail).delete(deletePatient)


export default doctorRoute;