import express from "express";
import { verifyToken } from "../middlewares/authorization.js";
import { uploadPost } from "../controllers/uploadPost.js";
import upload from "../config/commentMulter.js";
import { addComment } from "../controllers/addComment.js";

const router = express.Router();

// Upload Post
router.post("/uploadPost", verifyToken, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), uploadPost);

// Add Comment
router.post("/addComment/:postId", verifyToken, upload.single("image"), addComment);

export default router;