import multer from "multer";
import path from "path";
import fs from "fs";

// Define absolute path to the uploads folder
const uploadDir = path.resolve("uploads");

// Create the directory automatically if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use the verified directory path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only jpeg, jpg and png files are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
