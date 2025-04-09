import { UserModel } from '../datasource/connect.database.js';
import bcrypt from 'bcryptjs';

export const signupPage = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!UserModel) {
      throw new Error('UserModel is not initialized');
    }

    const existingUser = await UserModel.findOne({ where: { email } });

    if (!existingUser) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await UserModel.create({ email, password: hashedPassword });

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
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Internal server error',
      err,
    });
  }
};


export const LoginPage = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await UserModel.findOne({ where: { email } });

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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      err,
    });
  }
};
