import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";


const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Go to incomming matched rest-api request 
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

//Get the Port from env file
const PORT = process.env.PORT || 3001;
//Get the Connection URL from env file
const CONNECTION_URL = process.env.MONGO_URI;

//Connection to the mongoDb database using mongoose
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    })
  )
  .catch((err) => console.log(`Aditya Error is Comming ${err}`));
