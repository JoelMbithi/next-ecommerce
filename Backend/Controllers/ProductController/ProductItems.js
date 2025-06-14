
import db from "../../utils/db.js"


/* create product item */

export const createProductItem = async (req,res) => {
    const {product_id,color_id,size_id,original_price,sell_price} = req.body;
    try {
        const createProductItem = await db.query(
            `INSERT INTO product_items (product_id,color_id,size_id,original_price,sell_price) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [product_id,color_id,size_id,original_price,sell_price]
        )
        res.status(200).json({
            status:"success",
            message:"Successful created Product",
            data:createProductItem.rows[0]
        })
    } catch (error) {
        console.log("Failed to create product item",error)
        res.status(500).json({
            status:"error",
            message:"Error when creating product item"
        })
    }
}  

/* get a product */

export const getProductItem = async (req,res) => {
    const {product_items_id} = req.params
    try {
        const getProductItem = await db.query(
            `SELECT * FROM product_items WHERE product_items_id = $1`,
            [product_items_id]
        )

        if (getProductItem.rows.length === 0) {
            return res.status (403).json({
                status :"error",
                message:"Product item not found"
            })

        }
        res.status(200).json({
      status:"success",
      message:"Successful retrieved product item",
      data:getProductItem.rows[0]
        })
    } catch (error) {
         console.log("Failed to get product item",error)
        res.status(500).json({
            status:"error",
            message:"Error when getting product item"
        })
    }
}


/* get all product */

export const allProductItems = async (req,res) => {
    try {
        const allProductItem = await db.query(
        `SELECT * FROM product_items`
        )
        res.status(200).json({
            status:"success",
            message:"Successful retrieved all product item ",
            data:allProductItem.rows
        })
    } catch (error) {
         console.log("Failed to get all product  item",error)
        res.status(500).json({
            status:"error",
            message:"Error when getting all product item"
        })
    }
}


/* update product items */

export const updateProductItem = async (req,res) => {
    const {original_price,sell_price} = req.body;
    const {product_items_id} = req.params
   try {
     const updateProductItem =await db.query(
        `UPDATE product_items SET original_price = $1, sell_price= $2  WHERE product_items_id = $3`,
        [sell_price,original_price, product_items_id]
    )

    res.status(200).json({
        status:"success",
        message:"Successful updated product item",
        data:updateProductItem.rows[0]
    })
   } catch (error) {
     console.log("Failed to update product  item",error)
        res.status(500).json({
            status:"error",
            message:"Error when updating product item"
        })
   }
}

/* Delete product item */

export const deleteProductItem = async (req,res) => {
    const {product_items_id} = req.params
    try {
        const deleteProductItems = await db.query(
       ` DELETE FROM product_items WHERE product_items_id = $1` ,
    [product_items_id]       )
    res.status(200).json({
        status:"success",
        message:"Successful deleted product item",
        data:deleteProductItems.rows[0]
    })
    } catch (error) {
         console.log("Failed to delete product  item",error)
        res.status(500).json({
            status:"error",
            message:"Error when deleting product item"
        })
    }
}