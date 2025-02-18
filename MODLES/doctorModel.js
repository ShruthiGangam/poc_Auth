import mongoose from "mongoose";

const doctor_authSchema = new mongoose.Schema({
    doctor_id:{
        type: String,
        required: true,
        unique: true
    },
    passsword: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    }
});

export default mongoose.model("doctor_auth", doctor_authSchema);
