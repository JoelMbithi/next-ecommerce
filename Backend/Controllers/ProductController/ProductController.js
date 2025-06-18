import db from '../../utils/db.js'

/* Create Product */
export const createProduct = async (req, res) => {
    const { product_name, product_category_id, product_description } = req.body;
    try {
        const product = await db.query(
            `INSERT INTO product (product_name, product_category_id, product_description) 
             VALUES ($1, $2, $3) RETURNING *`,
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

/* Get Single Product - with grouped variants/images */
export const getSingleProduct = async (req, res) => {
    const { product_id } = req.params;
    try {
        const result = await db.query(
            `SELECT 
                p.product_id,
                p.product_name,
                p.product_description,
                pc.category_name, 
                pc.category_image, 
                pc.category_description,
                pi.original_price,
                pi.sell_price,
                c.color_name,
                i.image_url
            FROM product p
            JOIN product_category pc ON p.product_category_id = pc.product_category_id
            JOIN product_items pi ON p.product_id = pi.product_id
            JOIN color c ON pi.color_id = c.color_id
            JOIN product_image i ON pi.product_items_id = i.product_items_id
            WHERE p.product_id = $1`,
            [product_id]
        );

        const rows = result.rows;

        if (rows.length === 0) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        // Base product info
        const base = rows[0];
        const product = {
            product_id: base.product_id,
            product_name: base.product_name,
            product_description: base.product_description,
            category_name: base.category_name,
            category_image: base.category_image,
            category_description: base.category_description,
            variants: []
        };

        // Group variants
        rows.forEach(row => {
            product.variants.push({
                color_name: row.color_name,
                image_url: row.image_url,
                original_price: row.original_price,
                sell_price: row.sell_price
            });
        });

        res.status(200).json({
            status: "success",
            message: "Successfully retrieved product",
            data: product
        });

    } catch (error) {
        console.error("Failed to get a product:", error);
        res.status(500).json({
            status: "error",
            message: "Error when retrieving a product"
        });
    }
};

/* Get All Products - flat list */
export const allProduct = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT 
                p.*, 
                pc.category_name, 
                pc.category_image, 
                pc.category_description,
                pi.product_items_id,
                pi.original_price,
                pi.sell_price,
                c.color_name,
                i.image_url
            FROM product p
            JOIN product_category pc ON p.product_category_id = pc.product_category_id
            JOIN product_items pi ON p.product_id = pi.product_id
            JOIN color c ON pi.color_id = c.color_id
            JOIN product_image i ON pi.product_items_id = i.product_items_id
            ORDER BY p.product_id`
        );

        const productMap = new Map();

        for (const row of result.rows) {
            const productId = row.product_id;

            if (!productMap.has(productId)) {
                productMap.set(productId, {
                    product_id: row.product_id,
                    product_name: row.product_name,
                    product_description: row.product_description,
                    product_category_id: row.product_category_id,
                    created_at: row.created_at,
                    updated_at: row.updated_at,
                    category_name: row.category_name,
                    category_image: row.category_image,
                    category_description: row.category_description,
                    variants: []
                });
            }

            const product = productMap.get(productId);

            let variant = product.variants.find(v => v.product_items_id === row.product_items_id);
            if (!variant) {
                variant = {
                    product_items_id: row.product_items_id,
                    color_name: row.color_name,
                    original_price: row.original_price,
                    sell_price: row.sell_price,
                    images: []
                };
                product.variants.push(variant);
            }

            // Add unique image URLs
            if (!variant.images.includes(row.image_url)) {
                variant.images.push(row.image_url);
            }
        }

        const finalProducts = Array.from(productMap.values());

        res.status(200).json({
            status: "success",
            message: "Successfully retrieved all products",
            data: finalProducts
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
            `UPDATE product 
             SET product_name = $1, product_description = $2 
             WHERE product_id = $3 
             RETURNING *`,
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
            `DELETE FROM product 
             WHERE product_id = $1 
             RETURNING *`,
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
