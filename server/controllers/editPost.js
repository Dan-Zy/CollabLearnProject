import { log } from "console";
import {Post} from "../models/postModel.js";
import fs from "fs";

const editPost = async (req, res) => {
    try {
        
        const {postId} = req.params;
        const userId = req.userId;
        const {content} = req.body;
        const image = req.files.image ? req.files.image[0].path : "";
        const document = req.files.document ? req.files.document[0].path : "";
        const video = req.files.video ? req.files.video[0].path : "";

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if(post.userId.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to edit this post"
            });
        }

        if(!content){
            return res.status(400).json({
                success: false,
                message: "Content is required"
            });
        }

        const contentLength = content.split(/\s+/).length;

        if(contentLength > 500){
            return res.status(406).json({
                success: false,
                message: "Content length must not exceed 500 words"
            })
        }

        // Check if image is provided, validate its format and size
        if (image) {
            const validFormats = ['image/jpeg', 'image/png'];
            const imageSize = fs.statSync(image).size;
            const imageFormat = req.files.image[0].mimetype;

            if (!validFormats.includes(imageFormat)) {
                return res.status(406).json({
                    success: false,
                    message: "Given format is not accepted, only JPG and PNG are allowed"
                });
            }

            if (imageSize > 50 * 1024 * 1024) { // Image size more than 50MB
                return res.status(406).json({
                    success: false,
                    message: "Image size must not exceed 50MBs"
                });
            }
        }


        // Document validation
        if (document) {
            const validDocumentFormats = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            const documentSize = fs.statSync(document).size;
            const documentFormat = req.files.document[0].mimetype;

            if (!validDocumentFormats.includes(documentFormat)) {
                return res.status(406).json({
                    success: false,
                    message: "Document format not accepted. Allowed formats are PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX."
                });
            }

            if (documentSize > 150 * 1024 * 1024) { // Document size more than 150MB
                return res.status(406).json({
                    success: false,
                    message: "Document size must not exceed 150MBs"
                });
            }
        }


        // Video validation
        if (video) {
            const validVideoFormats = ['video/mp4'];
            const videoSize = fs.statSync(video).size;
            const videoFormat = req.files.video[0].mimetype;

            if (!validVideoFormats.includes(videoFormat)) {
                return res.status(406).json({
                    success: false,
                    message: "Video format not accepted. Only MP4 is allowed."
                });
            }

            if (videoSize > 300 * 1024 * 1024) { // Video size more than 300MB
                return res.status(406).json({
                    success: false,
                    message: "Video size must not exceed 300MBs"
                });
            }
        }

        // Edit post data
        post.content = content;
        post.image = image;
        post.document = document;
        post.video = video;
        post.updatedAt = new Date();

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post has been edited successfully",
            post: post
        });



    } catch (error) {
        console.log("Error in editing post: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export default editPost