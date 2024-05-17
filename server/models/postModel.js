import mongoose from "mongoose";
// import User from "./userModel";


const commentSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },

    content: {
        type: String,
        maxlength: 500,
        required: true
    },

    upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },

    devotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

})


const postSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    content: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    },

    document: {
        type: String,
        default: ""
    },

    video: {
        type: String,
        default: ""
    },

    upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },

    devotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },

    comments: [commentSchema],

    shares: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },

    visibilty: {
        type: String,
        enum: ['Public', 'Private'],
        default: "Public"   
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: []
    }

});

export const Post = mongoose.model("Post", postSchema, "posts");
// const Comment = mongoose.model("Comment", commentSchema, "")
