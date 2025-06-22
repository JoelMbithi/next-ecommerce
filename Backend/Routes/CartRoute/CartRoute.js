import express from "express"
import { addToCart } from "../../Controllers/CartController/CartControler.js"

const router = express.Router()

router.post('/addToCart',addToCart)
export default router