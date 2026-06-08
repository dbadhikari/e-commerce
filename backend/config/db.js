import mongoose from "mongoose";

const connectdb=async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_KEY)
        console.log("db Connected...")
    } catch (error) {
        console.log("db Connection error")
    }
}

export default connectdb