import db from '../../utils/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    const { email, password, username, role } = req.body;
    
    try {
        // Validate input
        if (!email || !password || !username || !role) {
            return res.status(400).json({ 
                status: "error",
                message: "All fields are required"
            });
        }

        // Verify the requested role exists
        const roleCheck = await db.query(
            `SELECT role_id FROM roles WHERE role_name = $1`,
            [role.toLowerCase()]
        );

        // Check if role exists
        if (roleCheck.rows.length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Invalid role specified"
            });
        }

        const roleId = roleCheck.rows[0].role_id;

        // Check if user already exists
        const userExist = await db.query(
            `SELECT user_id FROM users WHERE email = $1 OR username = $2`,
            [email, username]
        );

        if (userExist.rows.length > 0) {
            return res.status(409).json({ 
                status: "error",
                message: "User already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user in database
        
        const newUser = await db.query(
            `INSERT INTO users (email, password, username, role_id) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [email, hashedPassword, username, roleId] 
        );

        res.status(201).json({ 
            status: "success",
            message: "User registered successfully",
            data: {
                user: newUser.rows[0],
                role: role
            }
        });
        
    } catch (error) {
        console.error('Failed to register new user:', error);
        res.status(500).json({
            status: "error", 
            message: "Internal server error during registration"
        });
    }
};


//login user 

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const result = await db.query(
      `SELECT users.*, roles.role_name FROM users 
       JOIN roles ON users.role_id = roles.role_id 
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    const user = result.rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials"
      });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role_name,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET,

      { expiresIn: "2h" }
    );

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role_name
        }
      }
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error during login"
    });
}
}