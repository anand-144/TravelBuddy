import ImageKit from "imagekit";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// ✅ Use memory storage for multer
export const upload = multer({ storage: multer.memoryStorage() });

// ✅ Upload to ImageKit
export const uploadToImageKit = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadResponse = await imagekit.upload({
      file: req.file.buffer, // direct from memory
      fileName: req.file.originalname,
      folder: "/travelbuddy/memories",
    });

    req.imageData = {
      imageUrl: uploadResponse.url,
      imageKitFileId: uploadResponse.fileId,
    };

    next();
  } catch (err) {
    console.error("❌ ImageKit upload error:", err.message);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// ✅ Delete file from ImageKit
export const deleteFromImageKit = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
    console.log("🗑️ Deleted from ImageKit:", fileId);
  } catch (err) {
    console.error("❌ ImageKit delete error:", err.message);
  }
};
