import app from "./src/app.js";
import dotenv from "dotenv"
import connectDB from "./src/config/database.js";

dotenv.config()
const port=3000
connectDB()
app.listen(port,()=>{
    console.log(`server is runnig on http://localhost:${port}`)
})