import { Feature } from "../../models/Feature.js";

export const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featuresImages = new Feature({
        image: image
    })

    await featuresImages.save();

    res.status(201).json({
        success: true,
        data: featuresImages
    })
  } catch (error) {
    console.log("Error in addFeatureImage", error.message);
    res.status(500).json({
      success: false,
      message: "Some Error Occured!",
    });
  }
};

export const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({})

    res.status(200).json({
        success: true,
        data: images,
      });
  } catch (error) {
    console.log("Error in addFeatureImage", error.message);
    res.status(500).json({
      success: false,
      message: "Some Error Occured!",
    });
  }
};
