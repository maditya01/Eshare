import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import dotenv from "dotenv";
const app = express(); //We are Getting Our App

dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
// app.get("/", (req, res) => {
//   res.send("Hello Memories App");
//   console.log("Hello Memories App");
// });
//Below hona chahiye.
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
const PORT = process.env.PORT || 3001;
console.log(PORT);
const CONNECTION_URL = process.env.MONGO_URI;
// console.log(PORT, CONNECTION_URL, process.env.NODE_ENV);
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    })
  )
  .catch((err) => console.log(`Aditya Error is Comming ${err}`));
