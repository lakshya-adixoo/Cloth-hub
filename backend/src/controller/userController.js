import { UserModel } from '../datasource/connect.database.js';

export const signupPage = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!UserModel) {
      console.error('UserModel is not initialized');
      throw new Error('UserModel is not initialized');
    }


    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      const newUser = await UserModel.create({ email, password });
      return res.status(201).json({ success: true, message: 'User added successfully' });
    }

    return res.status(200).json({ success: false, message: 'User already exists' });
  } catch (err) {
    console.error('Error in signupPage:', err);
    return res.status(500).json({
      success: false,
      msg: 'Internal server error',
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
  

      if (user.password !== password) {
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
      console.error("Error during login:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };