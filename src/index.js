import express from "express";
import { imageUpload, zipUpload } from "./uploader.js";
import dotenv from "dotenv";
import app_paths from "./paths.js";
dotenv.config();
const app = express();
app.use(express.static(app_paths.PUBLIC_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.post("/upload/images", imageUpload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Please select an image to upload");
    } else return res.status(200).send("File uploaded successfully!");
  } catch (error) {
    console.error(error);
    return res.status(400).send(`Error when trying upload image: ${error}`);
  }
});
app.post("/upload/zip", zipUpload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Please select an image to upload");
    } else return res.status(200).send("File uploaded successfully!");
  } catch (error) {
    console.error(error);
    return res.status(400).send(`Error when trying upload image: ${error}`);
  }
});
app.all("*", (req, res) => {
  // Method Not Allowed
  return res.sendStatus(405);
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
