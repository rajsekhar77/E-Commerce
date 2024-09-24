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

export const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const validItems = cart.items.filter((productItem) => {
      return productItem.productId;
    });

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => {
      return {
        productId: item.productId._id,
        image: item.productId.image,
        title: item.productId.title,
        price: item.productId.price,
        salePrice: item.productId.salePrice,
        quantity: item.quantity,
      };
    });

    // sending current userId cart document and his cart items and how it likes for data
    // let data = {
    //   userId: '12345',
    //   items: [{productId : '123456543', quantity: 2}, {productId: '87754', quantity:4}],
    //   items: {
    //     productId: '123',
    //     image: 'url',
    //     title: 'title',
    //     price: 'price',
    //     salePrice: 'salePrice',
    //     quantity: 'quntity',
    //   }
    // }
    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log("Error in fetchcartitems controller", error.message);
    res.status(500).json({ success: false, message: "Some Error Occured" });
  }
};

export const updateCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data Provided!",
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex((item) => {
      return item.productId.toString() === productId;
    });

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item is not present!",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;

    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => {
      return {
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
      };
    });

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log("Error in updatecartitemqty controller", error.message);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data Provided!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter((item) => {
      return item.productId._id.toString() !== productId;
    });

    await cart.save();

    const populateCartItems = cart.items.map((item) => {
      return {
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
      };
    });

    res.status(200).json({
      success: true,
      data: { ...cart._doc, items: populateCartItems },
    });
  } catch (error) {
    console.log("Error in deletecartitem controller", error.message);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};