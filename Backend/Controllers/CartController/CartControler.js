import db from '../../utils/db.js'

// Add to cart
export const addToCart = async (req, res) => {
  const { product_id, user_id, quantity } = req.body;

  try {
    // Check if this product is already in the user's cart
    const existingCartItem = await db.query(
      `SELECT * FROM cart WHERE user_id = $1 AND product_id = $2`,
      [user_id, product_id]
    );

    let result;

    if (existingCartItem.rows.length > 0) {
      // Update the quantity
      result = await db.query(
        `UPDATE cart SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *`,
        [quantity, user_id, product_id]
      );
    } else {
      // Insert new cart item
      result = await db.query(
        `INSERT INTO cart (product_id, user_id, quantity) VALUES ($1, $2, $3) RETURNING *`,
        [product_id, user_id, quantity]
      );
    }

    res.status(200).json({
      status: "success",
      message: "Product added to cart",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Failed to add product to cart:", error);
    res.status(500).json({
      status: "error",
      message: "Error when adding product to cart",
    });
  }
};


//get single cart product

export const getCartProducts = async (req, res) => {
  const user_id = req.user.user_id; // From authenticated user

  try {
    // Get cart with full product details
    const result = await db.query(
      `SELECT 
         c.cart_id,
         c.quantity,
         p.product_id,
         p.name,
         p.price,
         p.image_url,
       FROM cart c
       JOIN product p ON c.product_id = p.product_id
       WHERE c.user_id = $1`,
      [user_id]
    );

    // Calculate total
    //
    const total = result.rows.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    res.status(200).json({
      status: "success",
      data: {
        items: result.rows,
        total: total.toFixed(2),
        count: result.rows.length
      }
    });
  } catch (error) {
    console.error("Get cart products error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve cart items"
    });
  }
};