const router = require("express").Router();

const userController = require("../controllers/user.controller");
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
router.route("/getStores").get(userController.getStores);
router.route("/rateUser").post(userController.changeRating);
router.route("/getUserById/:id").get(userController.getUserById);
router.route("/logout").get(userController.getLogout);
router.route("/searchUsers").post(userController.searchUsers)
router.route("/follow").post(userController.followUser);
router.route("/unFollow").post(userController.unFollowUser);
router.post(
    "/register",
    multer({storage}).single("image"),
    userController.postRegister
);
router.route("/login").post(userController.postLogin);
router.route("/").get(userController.getSession);
module.exports = router;
