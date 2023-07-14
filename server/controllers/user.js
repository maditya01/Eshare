import bcrypt from "bcryptjs"; //For encrypting and Decrypt password
import jwt from "jsonwebtoken"; //For
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    //If our Credentials are correct.
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    return res.status(201).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  //What we have to DO when we hit this url
  //http://localhost:3001/user/signup
};

export const signup = async (req, res) => {
  //http://localhost:3001/user/signup
  // What we have to do when we hit this url
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email }); //await keyword lagana padega
    if (existingUser) {
      return res.status(400).json({ message: "User is  already existing" });
    }
    if (password != confirmPassword) {
      return res.status(400).json({ message: "password Does'nt Match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });
    //What is the Need of token?
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "4h",
    });
    return res.status(200).json({ result, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
