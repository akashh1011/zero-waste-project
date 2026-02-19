import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./database/dbconfig.js";
import assignmentRoute from "./routes/assignmentRoute.js";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/waste", assignmentRoute);


//connect db here
connectDB();

//main server here
app.listen(process.env.PORT || 9000, () =>{
  console.log(`server is running on port: ${process.env.PORT}`);
})