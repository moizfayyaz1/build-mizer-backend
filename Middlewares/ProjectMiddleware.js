// Authentication middleware function to check user verification
import { userVerification } from './AuthMiddleware.js';

// Ensure authenticated user verification before proceeding with project-related actions
export const authenticateUserForProjects = async (req, res, next) => {
  try {
    const userStatus = await userVerification(req, res);

    if (userStatus && userStatus.status===false) {
       
      return res.status(401);
    }

    // If user verification is successful, proceed to the project-related action
    next();
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};