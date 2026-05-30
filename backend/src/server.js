import express from 'express';
import authRoutes from './routes/authroute.js';
import messageRoutes from './routes/messageroute.js';
import path from 'path'; //build in node module for handling file paths
import { connectDB } from './lib/db.js';
import {ENV} from './lib/env.js'
import cookieParser from 'cookie-parser';

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3100;

//middleware
app.use(express.json()) // - req.body will be undefined without this, it parses incoming JSON requests and puts the parsed data in req.body
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


if(ENV.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend" , "dist" , "index.html"));

  });
}

app.listen(PORT, () => {
  console.log('Server is running on port: ' +  PORT);
  connectDB()
});