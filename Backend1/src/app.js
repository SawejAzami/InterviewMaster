import express from "express"
import authRouter from "./Routes/authRoutes.js";
import cookieParser from "cookie-parser";


const app=express()

// middleware
app.use(express.json())
app.use(cookieParser())

// routes
app.use("/api/auth",authRouter)

export default app;