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
        required: true
    },

    image: {
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

    comments: [{
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }],

    shares: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },

    sharedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: null
    },

    originalAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    visibility: {
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
        default: Date.now
    }

});

const Post = mongoose.model("Post", postSchema, "posts");
const Comment = mongoose.model("Comment", commentSchema, "comments");

export {Post , Comment}