import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./db/connectDB.js";

import router from "./router/router.js";


const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use("/",router);

connectDB();

const PORT=5000;
app.listen(PORT,console.log("backend Server started at",PORT));