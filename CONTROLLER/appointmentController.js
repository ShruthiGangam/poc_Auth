import appointment_auth from "../MODLES/appointmentModel.js"; 
import doctor_auth from "../MODLES/doctorModel.js";  
import patient_auth from "../MODLES/patientModel.js";  

// Get all appointments
 const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointment_auth.find()
           // .populate("doctor_id", "name specialization") // Populate doctor details
            //.populate("patient_id", "name phone") // Populate patient details
            .sort({ appointmentDate: 1, appointmentTime: 1 }); // Sort by date and time

        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointment records available" });
        }

        res.status(200).json({ totalAppointments: appointments.length, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get appointment by ID
 const getAppointmentById = async (req, res) => {
    try {
        const app = await appointment_auth.findOne({ appointment_id: req.params.id }).populate('doctor_id','name').populate("patient_id");
        if (!app) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        //when the result is printed id shouldn't print
        //const docName= await doctor.findById(app.doctor_id)
        //await 
        res.status(200).json(app);
    } catch (error) {
        console.error("Error fetching appointment:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Create an appointment
 const createAppointment = async (req, res) => {
    try {
        const { appointment_id,doctor_id, patient_id, appointmentDate, appointmentTime } = req.body;
        const d= await doctor.findOne({doctor_id: doctor_id});
        const p= await patient.findOne({patient_id: patient_id});

        // Validate required fields
        if (!doctor_id || !patient_id || !appointmentDate || !appointmentTime||!appointment_id) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAppointment = await appointment_auth.create({
            appointment_id,
            doctor_id: d._id,
            patient_id:p._id,
            appointmentDate,
            appointmentTime
        });

        res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
    } catch (error) {
        console.error("Error creating appointment:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAppointmentsByDoctorId = async (req, res) => {
    try {
        const doc= await doctor_auth.find({doctor_id:req.params.id})
      //  console.log(doc)
      //  console.log(doc[0]._id)
        const appointments = await appointment_auth
            .find({ doctor_id: doc[0]._id }) 

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this doctor." });
        }

        res.status(200).json({ totalAppointments: appointments.length, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const getAppointmentsByPatientId = async (req, res) => {
    try {
        const pai= await patient_auth.find({patient_id:req.params.id})
    //  console.log(pai)
    // console.log(pai[0]._id)
        const appointments = await appointment_auth
            .find({ patient_id: pai[0]._id }) 

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this doctor." });
        }

        res.status(200).json({ totalAppointments: appointments.length, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const app = await appointment_auth.findOne({ appointment_id: req.params.id });
        
        if (!app) {
            return res.status(404).json({ message: "appointment not found" });
        }

        await appointment_auth.deleteOne({ _id: app._id }); // Correct syntax for deleteOne
        res.status(200).json({ message: "appointment deleted successfully" });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export {getAllAppointments, getAppointmentById, createAppointment,getAppointmentsByDoctorId,getAppointmentsByPatientId,deleteAppointment};
