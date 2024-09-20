import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dgz9qr3nm",
  api_key: "267994884965594",
  api_secret: "y2ax_xy2gHiwBncFhD3gaTI9euY",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = new multer({ storage });

export { upload, imageUploadUtil };