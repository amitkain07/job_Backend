import User from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashPassword });
    const token = jwt.sign(
      { userID: user._id, name: user.name },
      process.env.JWT_secret,
      { expiresIn: "7d" }
    );

    res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    console.error("Error in register function:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "invalid Credentials" });
    }

    const token = jwt.sign(
      { userID: user._id, name: user.name },
      process.env.JWT_secret,
      { expiresIn: "7d" }
    );

    // compare passord
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ msg: "invalid credentials" });
    }

    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    console.error("Error in login function:", error);
    res.status(500).json({ msg: "Server error. Please try again later." });
  }
};

export { register, login };
