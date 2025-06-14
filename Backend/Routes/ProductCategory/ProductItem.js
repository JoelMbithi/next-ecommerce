import express from "express";
import {
  createProductItem,
  getProductItem,
  allProductItems,
  updateProductItem,
  deleteProductItem,
} from "../../Controllers/ProductController/ProductItems.js";

const router = express.Router();

router.post("/", createProductItem);
router.get("/:product_items_id", getProductItem);
router.get("/getAllProductItems", allProductItems);
router.put("/:product_items_id", updateProductItem);
router.delete("/:product_items_id", deleteProductItem);


export default router;
