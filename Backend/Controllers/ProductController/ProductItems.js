import db from "../../utils/db"


/* create product item */

export const createProductItem = async (req,res) => {
    const {product_id,color_id,size_id,original_price,sell_price} = req.body;
    try {
        const createProductItem = await db.query(
            `INSERT INTO product_items (product_id,color_id,size_id,original_price,sell_price) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [product_id,color_id,size_id,original_price,sell_price]
        )
    } catch (error) {
        console.log("Failed to create product item",error)
        res.status(500).json({
            status:"error",
            message:"Error when creating product item"
        })
    }
}