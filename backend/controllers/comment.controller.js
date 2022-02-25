const Comment = require("../models/comment.model");
const CommentReply = require("../models/commentReply.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createComment = async (req, res) => {
    const {postId} = req.params;
    const {message} = req.body;
    const {_id} = req.session.user;
    try {
        Post.findById(postId).then((post) => {
            if (!post) {
                res.json("Something went wrong!");
            }
            const comment = new Comment({message, author: _id, post: postId});
            comment
                .save()
                .then(() => res.json("Comment is added!"))
                .catch((err) => console.log(err));
        });
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.createReplyComment = async (req, res) => {
    const {parentCommentId} = req.body;
    const {message} = req.body;
    const {tag} = req.body;

    const user = req.session.user;
    if (!message) {
        res.json("Something went wrong!").status(500);
    }
    if (!parentCommentId) {
        res.json("Something went wrong!").status(500);
    }
    try {
        const comment = await Comment.findById(parentCommentId);

        if (!comment) {
            console.log("ımhere");
            res.json("Something went wrong!").status(500);
        }

        const commentReply = await new CommentReply({
            parentComment: parentCommentId,
            message,
            author: user._id,
            tag,
        });

        await commentReply.save();
        res.json("Comment reply is added!");
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.getComments = async (req, res) => {
    const {postId} = req.body;
    try {
        const coms = await Comment.find({post: postId}).populate(
            "author",
            "_id name image"
        );

        res.json(coms);
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.getReplyComments = async (req, res) => {
    const {parentCommentId} = req.body;
    try {
        let coms = await CommentReply.find({parentComment: parentCommentId})
            .populate("author", "_id name image")
            .sort("-createdAt");
        // if (!coms.length > 0) {
        //   res.json(["No coms!"]);
        // }
        const newComs = coms.map((com) => {
            if (com.tag !== "") {
                User.findOne({name: com.tag})
                    .then((result) => {
                        com._doc.tagId = result._id

                    })
                    .catch((err) => console.log(err));
            }
            console.log(com)
            return com;
        });

        res.json(newComs);
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.likeComment = async (req, res) => {
    const {commentId} = req.body;
    try {
        await Comment.findByIdAndUpdate(commentId, {
            $push: {
                likes: req.session.user._id,
            },
        });
        res.json("Comment is liked!");
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.unLikeComment = async (req, res) => {
    const {commentId} = req.body;
    try {
        await Comment.findByIdAndUpdate(commentId, {
            $pull: {
                likes: req.session.user._id,
            },
        });
        res.json("Comment is unliked!");
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.likeReplyComment = async (req, res) => {
    const {commentId} = req.body;
    try {
        await CommentReply.findByIdAndUpdate(commentId, {
            $push: {
                likes: req.session.user._id,
            },
        });
        res.json("CommentReply is liked!");
    } catch (err) {
        res.json("Something went wrong!").status(500);
    }
};
exports.unLikeReplyComment = async (req, res) => {
    const {commentId} = req.body;
    try {
        await CommentReply.findByIdAndUpdate(commentId, {
            $pull: {
                likes: req.session.user._id,
            },
        });
        res.json("CommentReply is unliked!");
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
