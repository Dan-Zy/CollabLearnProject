// import express from "express";
// import { upload } from "../config/postMulter.js";
// import { Post } from "../models/postModel.js";
// import multer from "multer";

// export const uploadPost = (req, res, next) => {
//     upload(req, res, async (err) => {
//         if (err) {
//             // Handle Multer-specific errors
//             if (err instanceof multer.MulterError) {
//                 return res.status(400).json({ error: `Multer error: ${err.message}` });
//             } else {
//                 return res.status(400).json({ error: `File upload error: ${err.message}` });
//             }
//         }

//         try {
//             // Retrieve userId from authenticated session or JWT
//             const userId = req.user._id;
//             const { content } = req.body;

//             // Check for minimum required information: at least content
//             if (!content) {
//                 return res.status(400).json({ error: 'Content is required for the post.' });
//             }

//             // Access the uploaded files, if any
//             const pictures = req.files['picture'] ? req.files['picture'][0].filename : "";
//             const documents = req.files['document'] ? req.files['document'][0].filename : "";
//             const videos = req.files['video'] ? req.files['video'][0].filename : "";

//             // Create a new post object using the model
//             const newPost = new Post({
//                 userId,
//                 content,
//                 image: pictures,
//                 document: documents,
//                 video: videos
//             });

//             // Save the new post to the database
//             await newPost.save();

//             // Respond to the client
//             res.status(201).json({
//                 message: 'New post created successfully',
//                 post: newPost
//             });
//         } catch (err) {
//             // Handle potential errors during database operations
//             if (err.name === 'ValidationError') {
//                 return res.status(400).json({ error: `Validation error: ${err.message}` });
//             } else {
//                 return res.status(500).json({ error: `Internal server error: ${err.message}` });
//             }
//         }
//     });

// };




import { Post } from "../models/postModel.js";

export const uploadPost = async (req, res) => {
    try {
        const { content } = req.body;
        const image = req.files.image ? req.files.image[0].path : "";
        const document = req.files.document ? req.files.document[0].path : "";
        const video = req.files.video ? req.files.video[0].path : "";

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Content is required"
            });
        }
        
        const newPost = new Post({
            userId: req.userId,
            content,
            image,
            document,
            video,
            upvotes: [],
            devotes: [],
            comments: [],
            shares: [],
            visibility: "Public",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newPost.save();

        res.status(201).json({
            success: true,
            message: "Post uploaded successfully",
            post: newPost
        });
    } catch (error) {
        console.error("Error uploading post:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

