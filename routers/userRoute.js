import express from "express";
import { signup, login, showUsers, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/", showUsers);
userRouter.delete("/:id", deleteUser);

export default userRouter;