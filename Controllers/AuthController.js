import User from '../Models/UserModel.js';
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from 'bcryptjs';


export const Signup = async (req, res, next) => {
    try {

      const { firstname,lastname,email, password, createdAt } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400);
      }

      const user = await User.create({  firstname,lastname,email,password,createdAt });
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(201)
        .json({ message: "User signed in successfully", success: true, user });
      next();
    } catch (error) {
      console.error(error);
    }
  };



  export const Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      const token = createSecretToken(user._id);
      console.log(token);
      res.cookie('token', token, {
        httpOnly: false, // Set to true for added security
        sameSite: 'None',
        secure:'false' // Adjust to your needs
        // Other cookie options as needed
      });
      
      res.status(200).json({
        message: 'User logged in successfully',
        success: true,
        user: user, // Optionally, send user information back in the response
      });
  
      next(); // Continue to the next middleware
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
// In your server-side route (authRoute.js)

export const Logout = (req, res) => {
  // Clear the token on the server
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

  


