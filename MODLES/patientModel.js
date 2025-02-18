import mongoose from "mongoose";

const patient_authSchema = new mongoose.Schema({
    patient_id:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
});

export default mongoose.model("patient_auth", patient_authSchema);


