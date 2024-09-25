import { Address } from "../../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid Data Provided!",
      });
    }
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newlyCreatedAddress.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (error) {
    console.log("Error in addAddress: ", error.message);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "userId is required!",
      });
    }

    const addressList = await Address.find({ userId });

    res.status(201).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log("Error in fetchAllAddress: ", error.message);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "userId and addressId is required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.log("Error in editAddress: ", error.message);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "userId and addressId is required!",
      });
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!address) {
      res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    res.status(200).json({
        success: true,
        message: 'Address Deleted Successfully'
    })
  } catch (error) {
    console.log("Error in deleteAddress: ", error.message);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
