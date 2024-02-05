import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/UserModel.js'; // Adjust the import path as needed

dotenv.config();
export const userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401);
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ status: false, message: 'Token verification failed' });
      } else {
        const user = await User.findById(decodedToken.id);

        if (user) {
          req.user = user; // Populate req.user with user data
          
          return res.status(200);
        } else {
          return res.status(401).json({ status: false, message: 'User not found' });
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Internal server error in auth' });
  }
};
