import express from 'express'
import { allProductsCategory, createProductCategory, deleteProductCategory, getProductCategory, updateProduct } from '../../Controllers/ProductController/ProductCategoryController.js'

const router = express.Router()

router.post("/createCategory",createProductCategory)
router.get("/getProductCategory/:product_category_id",getProductCategory)
router.get("/getAllProductCategory",allProductsCategory)
router.put("/updateProductCategory/:product_category_id",updateProduct)
router.delete("deleteProductCategory",deleteProductCategory)


export default router