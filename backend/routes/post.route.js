const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/img/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
router.route("/getPostsAll").get(postController.getPostsAll);
router.route("/getPostById/:id").get(postController.getPostById);
router.route("/getPostsById/:id").get(postController.getPostsById);
router.post(
    "/add",
    multer({storage}).array("images"),
    postController.addPost
);
router.route("/like/:id").get(postController.likePost);
router.route("/unLike/:id").get(postController.unLikePost);
router.route("/delete/:id").get(postController.deletePost);
router.post("/comment/").post(postController.addComment);
module.exports = router;
