const FormData = require("../../../DB/models/Form.model");

const addData = async (req, res) => {
    try{
        const {Name , email , MobileNumber , Specialties } = req.body;
        const AddData = await FormData.create({
            Name,
            email,
            MobileNumber,
            Specialties,
        })
        return res.status(201).json({status : "Success" , message : "Data Added Successfully" , data : AddData})
    }catch (error) {
        return res.status(500).json({status : "Failed to Added" , message : error.message})
    }
}

module.exports = {addData}