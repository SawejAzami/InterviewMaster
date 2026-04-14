import mongoose from "mongoose";

const dbName="interviewMaster"
async function connectDB() {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/${dbName}`);
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB