import mongoose from "mongoose";

const  connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected");
    }catch(err){
        console.error(`Error: ${err.message}`);
    }
}

export default connectDB;