import {
  getAllDirectoryContents,
  getDirectoryContent,
} from "../controllers/files.js";
import express from "express";

const router = express.Router();

router.get("/getAllDirectoryContents", getAllDirectoryContents);
router.get("/getDirectoryContent", getDirectoryContent);

router.get("/getAllDirectoryContents/:page/:pageSize", getAllDirectoryContents);
router.get(
  "/getDirectoryContent/:directoryPath/:page/:pageSize",
  getDirectoryContent
);

export default router;
