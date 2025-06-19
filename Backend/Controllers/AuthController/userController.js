import db from '../../../Backend/utils/db.js'


/* Create new user */

export const  register = async (req,res) => {
    const {email,password,username,role} = req.body
    try {
        //validate input
        if(!email || !password || !username || !role){
            return res.status(403).json({
                status:"error",
                message:"All Input required"
            })
        }

        
        const user = await db.query(

        )
    } catch (error) {
        console.log('Failed to register new user', error)
        res.status(500).json({
            status:"success",
            message:"Error when registering new user"
        })
    }
}