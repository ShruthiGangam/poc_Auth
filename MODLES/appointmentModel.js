import mongoose from "mongoose";
import doctor_auth from "../MODLES/doctorModel.js";  
import patient_auth from "../MODLES/patientModel.js";

const appointment_authSchema = new mongoose.Schema({
    appointment_id:{
        type: String,
        required: true,
        unique: true
    },
    doctor_id: {
       type: mongoose.Schema.Types.ObjectId,
      //  type: String,
        ref: doctor_auth, // Reference to the Doctor model
    },
    patient_id: { // Using ObjectId instead of phone number
        //type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: patient_auth, // Reference to Patient model
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
});

export default mongoose.model("appointment_auth", appointment_authSchema);
