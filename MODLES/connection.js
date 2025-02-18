import mongoose from "mongoose";

const connectdb= async () =>{
    try{
        const connect= await mongoose.connect(process.env.CONNECTION_MONGO);
        console.log("database connected")
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export {connectdb};