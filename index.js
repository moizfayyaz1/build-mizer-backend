import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './Routes/AuthRoute.js';
import projectRoute from './Routes/ProjectRoute.js';
import userRoute from './Routes/UserRoute.js';
import materialRoute from './Routes/MaterialRoute.js';
import custommaterialRoute from './Routes/CustomMaterialRoute.js';
import brickRoute from './Routes/Material/BrickRoute.js';
import cementRoute from './Routes/Material/CementRoute.js';
import crushRoute from './Routes/Material/CrushRoute.js';
import sandRoute from './Routes/Material/SandRoute.js';
import steelRoute from './Routes/Material/Steel.js';
import calculateRoute from './Routes/CalculatorRoute.js';
const app = express();
dotenv.config();
// Middleware

app.use(cookieParser());
app.use(bodyParser.json());
// Connect to MongoDB Atlas (replace with your MongoDB Atlas connection string)
mongoose.connect(process.env.YOUR_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://build-mizer-knf8wmvz2-moizfayyaz1.vercel.app"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  
   
// Define your routes here
app.use("/", authRoute);
app.use("/projects", projectRoute);
app.use('/calculator',calculateRoute);
app.use('/materials',materialRoute);
app.use('/custom',custommaterialRoute);
app.use('/',userRoute);
// material routes
app.use('/brick',brickRoute);
app.use('/cement',cementRoute);
app.use('/crush',crushRoute);
app.use('/steel',steelRoute);
app.use('/sand',sandRoute);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servers is running on port ${PORT}`);
});


app.use(cookieParser());

app.use(express.json());

