import db from '../../utils/db.js'

export const createProductCategory = async (req,res) => {
    const {category_name, category_image,category_description} = req.body
    try {
        const productCategory = await db.query(
            `INSERT INTO product_category (category_name, category_image,category_description) VALUES ($1,$2,$3) RETURNING *`,
            [category_name, category_image,category_description]
        )

        const newProductCategory = productCategory.rows[0]

        res.status(200).json({
            status:"success",
            message:"Successful created a product",
            data:newProductCategory
        })
    } catch (error) {
        console.error("Error when creating product category:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to create product category",
    });

    }
}

/* Get A Product */

  export const getProductCategory = async (req,res) => {
     const { product_category_id } = req.params;
      try {
          const productCategory = await db.query (
              `SELECT *  FROM product_category WHERE product_category_id = $1`,
              [product_category_id]
          )
          
      if (productCategory.rows.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Product not found",
        });
      }

      const singleProduct = productCategory.rows[0];

      res.status(200).json({
        status: "success",
        message: "Successfully retrieved a product",
        data: singleProduct,
      });
      } catch (error) {
          console.error("Error when getting product category:", error);

      res.status(500).json({
        status: "error",
        message: "Failed to get product category",
      });
      }
  }

/* All product */

export const allProductsCategory = async (req, res) => {
  try {
    const productCategory = await db.query(
      `SELECT 
        pc.*, 
        p.product_id, 
        p.product_name, 
        pi.original_price,
        pi.sell_price
      FROM product_category pc
      JOIN product p 
      ON pc.product_category_id = p.product_category_id

      JOIN product_items pi
      ON  p.product_id = pi.product_id
      ORDER BY pc.product_category_id;`
    );

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved all productCategory",
      data: productCategory.rows
    });
  } catch (error) {
    console.error("🔥 Error When Getting All Product:", error); // 👈 Important
    res.status(500).json({
      status: "error",
      message: "Failed to get All Product"
    });
  }
};


/* Update a product */

export const updateProduct = async (req,res) => {
     const {category_name, category_image,category_description} = req.body
     const {product_id} = req.params
    try {
        const updatedProduct = await db.query(
            `UPDATE product_category SET category_name = $1, category_image =$2,category_description = $3 WHERE product_category = $4 `,
            [category_name, category_image, category_description, product_id]
        ) 
           res.status(200).json({
      status: "success",
      message: "Product category updated successfully",
      data: updatedProduct.rows[0],
    });
    } catch (error) {
        console.log("Failed to Update Product",error)
        res.status(500).json({
            status:"error",
            message:"Failed to update Product"
        })
    }
}

/* Delete Product Category */

 export const deleteProductCategory = async (req, res) => {
  const { product_category_id } = req.params;

  try {
    const result = await db.query(
      `DELETE FROM product_category WHERE product_category_id = $1`,
      [product_category_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        status: 'error',
        message: "Product category not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully deleted the product category",
    });
  } catch (error) {
    console.error("Error deleting product category:", error);
    res.status(500).json({
      status: "error",
      message: "Server error while deleting the product category",
    });
  }
};
