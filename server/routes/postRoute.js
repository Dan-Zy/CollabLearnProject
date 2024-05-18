import express from "express";
import { verifyToken } from "../middlewares/authorization.js";
import { uploadPost } from "../controllers/uploadPost.js";
import upload from "../config/commentMulter.js";
import { addComment } from "../controllers/addComment.js";
import {upvotePost, upvoteComment} from "../controllers/upvote.js";
import { devotePost, devoteComment } from "../controllers/devote.js";
import sharePost from "../controllers/sharePost.js";

const router = express.Router();

// Upload Post
router.post("/uploadPost", verifyToken, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), uploadPost);

// Add Comment
router.post("/addComment/:postId", verifyToken, upload.single("image"), addComment);

// Upvote Post
router.post("/upvotePost/:postId", verifyToken, upvotePost);

// Upvote Comment
router.post("/upvoteComment/:commentId", verifyToken, upvoteComment);


// Devote Post
router.post("/devotePost/:postId", verifyToken, devotePost);

// Devote Comment
router.post("/devoteComment/:commentId", verifyToken, devoteComment);

// Share Post
router.post("/sharePost/:postId", verifyToken, sharePost);

export default router;