import db from '../../utils/db.js'


//get single User

export const singleUser = async (req,res) => {
const {user_id} = req.params
try {
     const user = await db.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [user_id]
    )
    //check if user exist
    if(user.rows.length === 0){
        return res.status(403).json({
            status:"error",
            message:"user does not exist"
        })
    }
   

    res.status(200).json({
        status:"success",
        message:"Successful retrieved user",
        data:user.rows[0]
    })
} catch (error) {
    console.log("failed to get ")
}

}

//getAll user

export const getAllUsers = async (req,res) => {
    try {
        const allUsers = await db.query(
            `SELECT * FROM users`
        )
        res.status(200).json({
            status:"success",
            message:"successful retrieved all users",
            data:allUsers.rows
        })
    } catch (error) {
        console.log("failed to get all users",error)
        res.status(500).json({
            status:"error",
            message:"Error when getting all users"
        })
    }
}

//update User

export const updateUsers = async (req,res) => {
    const {username,email} = req.body
    const {user_id} = req.params
    try {

        //Check if user exeist
/* 
        const checkUser = await db.query(
            `SELECT * FROM users WHERE user_id = $1`,
            [user_id]
        )

        if (checkUser.rows.length === 0){
            return res.status(403).json({
                status:"error",
                message:"User does not exist"
            })
        } */
        const updatedUser = await db.query(
            `UPDATE users SET username= $1,email = $2 WHERE user_id=$3 RETURNING *`,
            [username,email,user_id]
        )

        res.status(200).json({
            status:"Success",
            message:"Successful updated user",
            data:updatedUser.rows[0]
        })
    } catch (error) {
        
    }
}

//Delete user

export const deleteUser = async (req,res) => {
    const {user_id} = req.params

    try {
        //check if user exist
          const checkUser = await db.query(
            `SELECT * FROM users WHERE user_id = $1`,
            [user_id]
        )

        if (checkUser.length.rows === 0){
            return res.status(403).json({
                status:"error",
                message:"User does not exist"
            })
        }

        const deleteUser = await db.query(
                `DELETE FROM user WHERE user_id = $1 ,
                [user_id]`
        )

        res.status(200).json({
            status:"success",
            message:"Successful deleted user",
            data:deleteUser.rows[0]
        })
        
    } catch (error) {
         console.log("failed to delete user",error)
        res.status(500).json({
            status:"error",
            message:"Error when deleting user"
        })
    }
}