import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./database/dbconfig.js";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) =>{
  res.send("Hello from the server");
})

connectDB();

app.listen(process.env.PORT || 9000, () =>{
  console.log(`server is running on port: ${process.env.PORT}`);
})