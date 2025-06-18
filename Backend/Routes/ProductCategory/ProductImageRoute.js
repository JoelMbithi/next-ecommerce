import express from "express";
import {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
} from "../../Controllers/ProductController/ProductImage.js";

const router = express.Router();

router.post("/", createImage);
router.get("/", getAllImages);
router.get("/:id", getImageById);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);

export default router;
