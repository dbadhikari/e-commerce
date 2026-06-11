import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import connectdb from './config/db.js'
import routes from './Routes/MainRoutes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import path from "path";

const app=express()
connectdb()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frontend={
    origin:[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    credentials: true,
}
app.use(cors(frontend));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api",routes)


app.get("/",(req,res)=>{
res.send("this is backend")
})


app.listen(2000,()=>{
    console.log("server started...")
})
