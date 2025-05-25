const express = require("express");
const router = express.Router();
const {addCommeunt , getComments , deleteComment} = require('./Controller/Comment.controller');
const {requireAuth} = require('../../middleware/JWT');


router.post('/comments/:postId', requireAuth, addCommeunt);
router.get('/comments/:postId', requireAuth, getComments);
router.delete('/comments/:commentId', requireAuth, deleteComment);


module.exports = router