import express from "express";
import { verifyToken } from "../middlewares/authorization.js";
import { uploadPost } from "../controllers/uploadPost.js";
import upload from "../config/postMulter.js";

const router = express.Router();

// Upload Post
router.post("/uploadPost", verifyToken, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), uploadPost);

export default router;