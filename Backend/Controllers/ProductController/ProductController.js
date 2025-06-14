import db from '../../utils/db.js'

/* Create Product */
export const createProduct = async (req, res) => {
    const { product_name, product_category_id, product_description } = req.body;
    try {
        const product = await db.query(
            `INSERT INTO product (product_name, product_category_id, product_description) VALUES ($1, $2, $3) RETURNING *`,
            [product_name, product_category_id, product_description]
        );

        res.status(201).json({
            status: "success",
            message: "Successfully created a product",
            data: product.rows[0]
        });
    } catch (error) {
        console.error("Failed to create product:", error);
        res.status(500).json({
            status: "error",
            message: "Error when creating a product"
        });
    }
};

/* Get Single Product */
export const getSingleProduct = async (req, res) => {
    const { product_id } = req.params;
    try {
        const product = await db.query(
            `SELECT * FROM product WHERE product_id = $1`,
            [product_id]
        );

        if (product.rows.length === 0) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully retrieved product",
            data: product.rows[0]
        });
    } catch (error) {
        console.error("Failed to get a product:", error);
        res.status(500).json({
            status: "error",
            message: "Error when retrieving a product"
        });
    }
};

/* Get All Products */
export const allProduct = async (req, res) => {
    try {
        const allProduct = await db.query(`SELECT * FROM product`);

        res.status(200).json({
            status: "success",
            message: "Successfully retrieved all products",
            data: allProduct.rows
        });
    } catch (error) {
        console.error("Failed to get all products:", error);
        res.status(500).json({
            status: "error",
            message: "Error when retrieving all products"
        });
    }
};

/* Update Product */
export const updateProduct = async (req, res) => {
    const { product_name, product_description } = req.body;
    const { product_id } = req.params;

    try {
        const updatedProduct = await db.query(
            `UPDATE product SET product_name = $1, product_description = $2 WHERE product_id = $3 RETURNING *`,
            [product_name, product_description, product_id]
        );

        if (updatedProduct.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully updated the product",
            data: updatedProduct.rows[0]
        });
    } catch (error) {
        console.error("Failed to update product:", error);
        res.status(500).json({
            status: "error",
            message: "Error when updating product"
        });
    }
};

/* Delete Product */
export const deleteProduct = async (req, res) => {
    const { product_id } = req.params;

    try {
        const deletedProduct = await db.query(
            `DELETE FROM product WHERE product_id = $1 RETURNING *`,
            [product_id]
        );

        if (deletedProduct.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Successfully deleted the product",
            data: deletedProduct.rows[0]
        });
    } catch (error) {
        console.error("Failed to delete product:", error);
        res.status(500).json({
            status: "error",
            message: "Error when deleting product"
        });
    }
};
