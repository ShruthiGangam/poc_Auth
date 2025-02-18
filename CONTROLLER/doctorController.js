import doctor_auth from "../MODLES/doctorModel.js";  
import bcrypt from "bcrypt"


const getDoctorDetails=async (req,res)=>{
    try{
        const doctors= await doctor_auth.find().sort({ name: 1 }).select("-_id").select("-__v");
        const count = await doctor_auth.countDocuments();
        if(doctors.lenght==0){
            console.log("no data doctor records available")
            res.status(401)
        }
        res.status(200).json({
            totalDoctors: count,
            doctors: doctors
        });
    }catch(error) {
        console.error("Error fetching doctor details:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const createDoctor = async (req, res) => {
    try {
        const { doctor_id,name, specialization,password } = req.body;
        console.log("entered",doctor_id,name, specialization)
        // Check if required fields are provided
        if (!name || !doctor_id ||  !specialization||!password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const hashed_pass= await bcrypt.hash(password,10);
        // Create new doctor record
        const newDoctor = await doctor_auth.create({
            doctor_id,
            password:hashed_pass,
            name,
            specialization
        });

        res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor });
    } catch (error) {
        console.error("Error creating doctor:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//insert many
 const createDoctorMany = async (req, res) => {
    try {
        const doctors = req.body; // Expecting an array of doctor objects from request body

        if (!Array.isArray(doctors) || doctors.length === 0) {
            return res.status(400).json({ message: "Invalid input. Provide an array of doctors." });
        }

        const insertedDoctors = await doctor_auth.insertMany(doctors);
        res.status(201).json({
            message: "Doctors inserted successfully",
            doctors: insertedDoctors
        });
    } catch (error) {
        console.error("Error inserting doctors:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getDoctorDetail = async (req, res) => {
    try {
        const doc = await doctor_auth.findOne({ doctor_id: req.params.id },{_id:0,__v: 0});
        if (!doc) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json(doc);
    } catch (error) {
        console.error("Error fetching doctor details:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const doc = await doctor_auth.findOne({ doctor_id: req.params.id },{_id:0,__v: 0});

        if (!doc) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const updatedDoctor = await doctor_auth.findByIdAndUpdate(
            doc._id,
            req.body,
            { new: true, runValidators: true } // Returns updated doc & validates input
        );

        res.status(200).json(updatedDoctor);
    } catch (error) {
        console.error("Error updating doctor:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const doc = await doctor_auth.findOne({ doctor_id: req.params.id });
        
        if (!doc) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        await doctor_auth.deleteOne({ _id: doc._id }); // Correct syntax for deleteOne
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export {getDoctorDetails,createDoctor,updateDoctor,getDoctorDetail,deleteDoctor,createDoctorMany};