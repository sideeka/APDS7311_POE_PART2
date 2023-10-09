import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";

import fs from "fs";

import users from "./routes/user.mjs"

import dotenv from "dotenv"
import https from "https";
import { nextTick } from "process";
//import path from "path";

dotenv.config();

const cert = process.env.CERT;
const key = process.env.KEY;
console.log(cert+ " CERT AND KEY "+ key)

const options = {
  key: fs.readFileSync(key),                  //Change Private Key Path here
  cert: fs.readFileSync(cert),            //Change Main Certificate Path here
  }

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use ((reg,res,next)=>
{
  res.setHeader('Access-Control-Allow-Origins','*');
  res.setHeader('Access-Control-Allow-Headers','*');
  res.setHeader('Access-Control-Allow-Methods','*');
  next();
})


app.use("/record", records);
app.use("/user",users);

let server = https.createServer(options,app)

app.get('/record',(req,res)=>{
//  res.send('HTTPS in ExpressJS')
})

//start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);//on the left of number 1 on the keyboard, under escape
  
});