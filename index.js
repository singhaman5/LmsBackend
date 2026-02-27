import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import dbConnect from "./config/db.js";
import userRouter from "./routers/userRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

const startServer = async () => {
  await dbConnect();
  app.listen(8080, () => console.log("Server started on port 8080"));
};

startServer();