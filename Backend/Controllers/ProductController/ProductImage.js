import db from "../../utils/db.js";

// CREATE Image
export const createImage = async (req, res) => {
  const { image_id, product_items_id, image_url } = req.body;

  try {
    const create = await db.query(
      `INSERT INTO product_image (image_id, product_items_id, image_url) VALUES ($1, $2, $3) RETURNING *`,
      [image_id, product_items_id, image_url]
    );
    res.status(200).json({
      status: "success",
      message: "Successfully created an image",
      data: create.rows[0],
    });
  } catch (error) {
    console.error("Failed to create image:", error);
    res.status(500).json({
      status: "error",
      message: "Error when creating image",
    });
  }
};

// GET ALL Images
export const getAllImages = async (req, res) => {
  try {
    const images = await db.query(`SELECT * FROM product_image`);
    res.status(200).json({
      status: "success",
      data: images.rows,
    });
  } catch (error) {
    console.error("Failed to fetch images:", error);
    res.status(500).json({
      status: "error",
      message: "Error when fetching images",
    });
  }
};

// GET ONE Image by ID
export const getImageById = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await db.query(
      `SELECT * FROM product_image WHERE image_id = $1`,
      [id]
    );

    if (image.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Image not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: image.rows[0],
    });
  } catch (error) {
    console.error("Failed to fetch image:", error);
    res.status(500).json({
      status: "error",
      message: "Error when fetching image",
    });
  }
};

// UPDATE Image by ID
export const updateImage = async (req, res) => {
  const { id } = req.params;
  const { product_items_id, image_url } = req.body;

  try {
    const updated = await db.query(
      `UPDATE product_image SET product_items_id = $1, image_url = $2 WHERE image_id = $3 RETURNING *`,
      [product_items_id, image_url, id]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Image not found for update",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Image updated successfully",
      data: updated.rows[0],
    });
  } catch (error) {
    console.error("Failed to update image:", error);
    res.status(500).json({
      status: "error",
      message: "Error when updating image",
    });
  }
};

// DELETE Image by ID
export const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db.query(
      `DELETE FROM product_image WHERE image_id = $1 RETURNING *`,
      [id]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Image not found for deletion",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Image deleted successfully",
      data: deleted.rows[0],
    });
  } catch (error) {
    console.error("Failed to delete image:", error);
    res.status(500).json({
      status: "error",
      message: "Error when deleting image",
    });
  }
};
