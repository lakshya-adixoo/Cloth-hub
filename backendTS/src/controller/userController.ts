import { Request, Response } from 'express';
import { UserModel } from '../datasource/connect.database';
import bcrypt from 'bcryptjs';



const getUserModel = () => {
  if (!UserModel) {
    throw new Error('UserModel is not initialized');
  }
  return UserModel;
};

export const signupPage = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const User = getUserModel();
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({ email, password: hashedPassword });

      return res.status(201).json({
        success: true,
        message: 'User added successfully',
        newUser: {
          id: newUser.id,
          email: newUser.email
        }
      });
    }

    return res.status(200).json({
      success: false,
      message: 'User already exists'
    });

  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      msg: 'Internal server error',
      err,
    });
  }
};

export const LoginPage = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const User = getUserModel();
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (err: unknown) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err,
    });
  }
};
