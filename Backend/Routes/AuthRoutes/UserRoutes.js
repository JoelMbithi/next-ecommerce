import express from 'express'
import { deleteUser, getAllUsers, singleUser, updateUsers } from '../../Controllers/AuthController/userController.js'


const router = express.Router()

router.get('/getUser/:user_id',singleUser)
router.get('/allUsers',getAllUsers)
router.put("/updateUser/:user_id",updateUsers)
router.delete("/deleteUser/:user_id",deleteUser)

export default router
