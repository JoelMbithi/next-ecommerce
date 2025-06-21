import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../../../Backend/utils/db.js';



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const userRes = await db.query(
      `SELECT u.user_id, u.email, u.password, r.role_name 
       FROM users u 
       JOIN roles r ON u.role_id = r.role_id 
       WHERE email = $1`,
      [email]
    );

    if (userRes.rows.length === 0) {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }

    const user = userRes.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: "error", message: "Invalid credentials" });
    }

    // Create JWT Token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role_name
      }
    });

  } catch (error) {
    console.error("Failed to login user:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};
