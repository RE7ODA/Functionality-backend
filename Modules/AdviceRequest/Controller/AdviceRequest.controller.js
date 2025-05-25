const AdviceRequest = require("../../../DB/models/AdviceRequest.model");

const CreateData = async (req, res) => {
    try{
        const {title , description , category , status } = req.body;
        const postAdvice = await AdviceRequest.create({
            title,
            description,
            category,
            status,
            CreatedBy : req.user.id
        })
        const postData = await AdviceRequest.findById(postAdvice._id).populate({path:"CreatedBy", select: {_id: 1 , usersName: 1}});
        return res.status(201).json({status : "Success" , message : "Post Created Successfully" , data : postData})
    }catch (error) {
        return res.status(500).json({status : "Failed to create" , message : error.message})
    }
}

const GetData = async (req, res) => {
    try{
        const getData = await AdviceRequest.find().populate({path:"CreatedBy", select: {_id: 1 , usersName: 1}});
        return res.status(200).json({status : "Success", message : "Get Data Successfully", data : getData})
    }catch (error) {
        return res.status(500).json({status : "Failed to GetData", message : error.message})
    }
}

const UpdateData = async (req, res) => {
    try{
        const postId = req.params.postId;
        const {title , description , category , status } = req.body;

        const updatedPost = await AdviceRequest.findByIdAndUpdate({_id : postId , CreatedBy: req.user.id} , {title , description , category , status}).populate({path:"CreatedBy", select:{_id: 1}});
        if(!updatedPost) return res.status(404).json({status : "Failed to Update", message : "Post Not Found"})
        return res.status(201).json({status : "Success", message : "Post Update Successfully", data : updatedPost})
    }catch (error) {
        return res.status(500).json({status : "Failed to update", message : error.message})
    }
}

const DeleteData = async (req, res) => {
    try{
        const id = req.params.postId;
        const postAdvice = await AdviceRequest.findByIdAndDelete({_id : id , CreatedBy: req.user.id});
        if(!postAdvice) return res.status(404).json({status : "Failed to Delete", message : "Post Not Found"})
        return res.status(200).json({status : "Success", message : "Post Deleted Successfully", data : postAdvice})
    }catch (error) {
        return res.status(500).json({status : "Failed to Delete", message : error.message})
    }
}

module.exports = {CreateData , GetData , UpdateData , DeleteData}