import express from "express";
import { getDoctorDetails,createDoctor,updateDoctor,getDoctorDetail,deleteDoctor,createDoctorMany } from "../CONTROLLER/doctorController.js"
const doctorRoute= express.Router();
//import { validateToken } from "../midddleware/validateToken.js";


//router.use(validateToken)


doctorRoute.route('/').get(getDoctorDetails).post(createDoctor)
doctorRoute.route('/:id').put(updateDoctor).get(getDoctorDetail).delete(deleteDoctor)
doctorRoute.route('/many/').put(createDoctorMany)


export default doctorRoute;