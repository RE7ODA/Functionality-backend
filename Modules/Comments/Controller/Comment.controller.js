const commentDB = require("../../../DB/models/Comment.model");
const AdviceRequest = require("../../../DB/models/AdviceRequest.model");

const addCommeunt = async (req, res) => {
    try{
        const {comment} = req.body;
        if(req.user.role !== "lawyer"){
            return res.status(403).json({ message: "Only lawyers can add comments." });
        }
        const post = await AdviceRequest.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const Comment = await commentDB.create({
            comment,
            postId: req.params.postId,
            createdBy: req.user.id
        });
        const commentName = await commentDB.findById(Comment._id).populate({path:"createdBy", select: "usersName role"});   
        return res.status(201).json({ message: "Comment added", commentName });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to add comment", error: error.message });
    }
}

const getComments = async (req, res) => {
    try{
        const postId = req.params.postId;
        const Comments = await commentDB.find({postId}).populate({path:"createdBy", select: "usersName role"});
        return res.status(200).json({ message: "Comments retrieved", Comments });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to retrieve comments", error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try{
        const commentId = req.params.commentId;
        const comment = await commentDB.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const deletedComment = await commentDB.findByIdAndDelete(commentId);
        return res.status(200).json({ message: "Comment deleted" , data: deletedComment });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to delete comment", error: error.message });
    }
}

module.exports = {addCommeunt , getComments , deleteComment}