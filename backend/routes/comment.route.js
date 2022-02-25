const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
router.route('/getComments').post(commentController.getComments);
router.route('/likeComment').post(commentController.likeComment);
router.route('/unLikeComment').post(commentController.unLikeComment);
router.route('/likeReplyComment').post(commentController.likeReplyComment);
router.route('/unLikeReplyComment').post(commentController.unLikeReplyComment);
router.route('/replyComment').post(commentController.createReplyComment);
router.route('/getReplyComments').post(commentController.getReplyComments);
router.route('/:postId').post(commentController.createComment);

module.exports = router;
