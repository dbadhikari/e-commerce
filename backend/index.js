
import dotenv from 'dotenv'
dotenv.config()
import express from "express"
import connectdb from './config/db.js'
const app=express()
connectdb()
app.get("/",(req,res)=>{
res.send("this is backend")
})


app.listen(2000,()=>{
    console.log("server started...")
})