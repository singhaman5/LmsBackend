import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const body = req.body;
    body.password = await bcrypt.hash(body.password, 10);
    await userModel.create(body);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ message: "Unable to create user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const found = await userModel.findOne({ email });
    if (!found) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, found.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: found._id, email: found.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login success", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const showUsers = async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  await userModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "User deleted" });
};

export { signup, login, showUsers, deleteUser };