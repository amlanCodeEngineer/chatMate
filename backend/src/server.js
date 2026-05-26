
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authroute.js';
import messageRoutes from './routes/messageroute.js';
import path from 'path'; //build in node module for handling file paths

dotenv.config();


const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3100;

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend" , "dist" , "index.html"));

  });
}

app.listen(PORT, () => {
  console.log('Server is running on port: ' +  PORT);
});