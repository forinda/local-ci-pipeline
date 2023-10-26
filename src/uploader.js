import multer from "multer";
import path from "path";
import app_paths from "./paths.js";
import fs from "fs";
import { v4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsPath = app_paths.UPLOADS_PATH;
    if (!fs.existsSync(uploadsPath))
      fs.mkdirSync(uploadsPath, { recursive: true });
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const id = v4();
    const file_name = `${id}${ext}`;
    cb(null, file_name);
  },
});

const imagesFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
};
const zipFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "application/zip",
    "multipart/x-zip",
    "application/x-zip-compressed",
    "application/x-compressed",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error("Invalid file type, only ZIP is allowed!"), false);
  }
};
const imageUpload = multer({
  storage: storage,
  fileFilter: imagesFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const zipUpload = multer({
  storage: storage,
  fileFilter: zipFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export { imageUpload, zipUpload };
