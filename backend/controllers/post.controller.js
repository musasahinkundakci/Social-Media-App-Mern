const User = require("../models/user.model");
const Post = require("../models/post.model");
const fs = require("fs");
const mongoose = require("mongoose")
const {mongo} = require("mongoose");
//genel postlar alınırken or kullanılarak lınıp düzeltilecek

exports.getPostById = async (req, res) => {
    let {id} = req.params;

    try {
        let post = await Post.findById(id)
            .populate("postedBy", "_id name image")
            .populate("comments.postedBy", "_id name image")


        if (!post) {
            res.json("There is no posts!");
        } else {
            res.json(post);
        }
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
}
exports.getPostsById = async (req, res) => {
    let {id} = req.params;

    try {
        let posts = await Post.find({postedBy: id})
            .populate("postedBy", "_id name image")
            .populate("comments.postedBy", "_id name image")
            .sort("-createdAt");

        if (!posts) {
            res.json("There is no posts!");
        } else {
            res.json(posts);
        }
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.getPostsAll = async (req, res) => {

    try {

        let user = await User.findById(req.session.user._id);
        const posts = await Post.find().or([{postedBy: user._id}, {postedBy: {$in: user.following}}]).populate("postedBy", "_id name image")
            .populate("comments.postedBy", "_id name image").sort("-createdAt");
        /*        let posts = await Post.find({postedBy: user._id})
                    .populate("postedBy", "_id name image")
                    .populate("comments.postedBy", "_id name image")
                    .sort("-createdAt");

                let newPosts = [];
                for (let item of user.following) {
                    try {
                        newPosts = await Post.find({postedBy: item})
                            .populate("postedBy", "_id name image")
                            .populate("comments.postedBy", "_id name image")
                            .sort("-createdAt");

                        posts = [...posts, ...newPosts];
                    } catch (err) {
                        console.log(err);
                    }
                }

                for (let i = 0; i < posts.length; i++) {
                    for (let j = 0; j < posts.length - 1; j++) {
                        if (posts[j].createdAt < posts[j + 1].createdAt) {
                            let a = posts[j];
                            posts[j] = posts[j + 1];
                            posts[j + 1] = a;
                        }
                    }
                }*/
        if (!posts) {
            res.json("There is no posts!");
        } else {
            res.json(posts);
        }
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.addPost = async (req, res) => {
    let user = req.session.user;
    let body = req.body.body;
    let files = req.files;

    let photos = files.map((file) => {
        return file.filename;
    });

    let postedBy = user._id;
    let post = new Post({body, photos, postedBy});
    try {
        await post.save();
        res.json("Post is added!");
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.unLikePost = async (req, res) => {
    const userId = req.session.user._id;
    Post.findByIdAndUpdate(req.params.id, {
        $pull: {likes: userId},
    })
        .then(() => {
            res.json("Post is unliked!");
        })
        .catch((err) => res.json("Something went wrong!").status(500)
        )
    ;
};
exports.likePost = async (req, res) => {
    Post.findByIdAndUpdate(req.params.id, {
        $push: {likes: req.session.user._id},
    })
        .then(() => res.json("Post is liked!"))
        .catch((err) => res.json("Something went wrong!").status(500));
};
exports.deletePost = async (req, res) => {
    let postId = req.params.id;
    let image;
    try {
        let post = await Post.findById(postId);
        images = post.photos;
        images.map(image => {
            fs.unlink("public/img/" + image, (err) => {
                if (err) throw err;
            });
        })
        await Post.findByIdAndDelete(postId);
        res.json("Post is deleted");
    } catch (err) {
        console.log(err);
        res.json("Something went wrong!").status(500);
    }
};
exports.addComment = (req, res) => {
    const comment = {
        comment: req.body.comment,
        postedBy: req.session.user._id,
    };
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $push: {comments: comment},
        },
        {
            new: true,
        }
    )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                res.json("Something went wrong!").status(500);
            } else {
                res.json(result);
            }
        });
};
