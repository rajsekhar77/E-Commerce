import { Order } from "../../models/Order.js";

export const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No Orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("Error in getAllOrdersByUser: ", error.message);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

export const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log("Error in getOrderDetails: ", error.message);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: 'Order status is updated successfully'
    })
  } catch (error) {
    console.log("Error in updateOrderStatus: ", error.message);
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};
