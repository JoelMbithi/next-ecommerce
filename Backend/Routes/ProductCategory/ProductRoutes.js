import express from 'express'
import { allProduct, createProduct, deleteProduct, getSingleProduct, updateProduct } from '../../Controllers/ProductController/ProductController.js'



const router = express.Router()

router.post("/createProduct",createProduct)
router.get("/getProduct/:product_id",getSingleProduct)
router.get("/getAllProduct",allProduct)
router.put("/updateProduct/:product_id",updateProduct)
router.delete("/deleteProduct",deleteProduct)


export default router