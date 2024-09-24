import { Cart } from "../../models/Cart.js";
import { Product } from "../../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data Provided!",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // if cart is already present
    let cart = await Cart.findOne({ userId });

    // if cart is empty, we have to create new cart for the current user
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // checking the product is already present or not
    const findCurrentProductIndex = cart.items.findIndex((item) => {
      return item.productId.toString() === productId;
    });

    // if product index is -1 means the product is not present in the cart
    //so we are adding that product first time
    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      // if product is already present we simply increase the quantity
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log("Error in addtocart controller", error.message);
    res.status(500).json({ success: false, message: "Some Error Occured" });
  }
};