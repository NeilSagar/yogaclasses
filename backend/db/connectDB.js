import mongoose from "mongoose";

const URL="mongodb://localhost:27017/yoga";
const connectDB=async ()=>{
    try {
        await mongoose.connect(URL);
        console.log("Connected with MongoDB:local successfully!");
    } catch (error) {
        console.log("Could not connect with MongoDB:local, Error:",error.message);
    }
}

export default connectDB;