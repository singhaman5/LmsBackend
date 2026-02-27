// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import dbConnect from "./config/db.js";
// import userRouter from "./routers/userRoute.js";

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use("/api/users", userRouter);

// const startServer = async () => {
//   await dbConnect();
//   app.listen(8080, () => console.log("Server started on port 8080"));
// };

// startServer();
// import express from "express";

// const app = express();

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "LMS Backend running" });
// });

// export default app; // ✅ REQUIRED
import express from "express";
import dbConnect from "./config/db.js";
import userRouter from "./routers/userRoute.js";

const app = express();

app.use(express.json());

let isConnected = false;

app.use(async (req, res, next) => {
  if (!isConnected) {
    await dbConnect();
    isConnected = true;
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "LMS Backend running" });
});

app.use("/api/users", userRouter);

export default app;