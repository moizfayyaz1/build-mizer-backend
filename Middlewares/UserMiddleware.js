import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../Models/UserModel.js'; // Adjust the import path as needed

dotenv.config();
export const userResponse = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ status: false, message: 'Token not found' });
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ status: false, message: 'Token verification failed' });
      } else {
        const user = await User.findById(decodedToken.id);

        if (user) {
          
          return res.status(200).json({ status: true,user:user.firstname });
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
