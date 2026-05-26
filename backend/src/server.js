
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authroute.js';
import messageRoutes from './routes/messageroute.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3100;

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.listen(PORT, () => {
  console.log('Server is running on port: ' +  PORT);
});