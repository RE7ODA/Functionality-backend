const supscriptions = require("../../../DB/models/Credit.model");

const addCard = async (req, res) => {
    try{
        const {cardName , cardNumber , expiry , CVV } = req.body;
        const AddCard = await supscriptions.create({
            cardName,
            cardNumber,
            expiry,
            CVV,
        })
        if(cardNumber.toString().length !== 16) {
            return res.status(400).json({status : "Failed" , message : "Card Number must be 16 digits"})
        }
        if(CVV.toString().length !== 3) {
            return res.status(400).json({status : "Failed" , message : "CVV must be 3 digits"})
        }
        return res.status(201).json({status : "Success" , message : "Card Added Successfully" , data : AddCard})
    }catch (error) {
        return res.status(500).json({status : "Failed to Added" , message : error.message})
    }
}

module.exports = {addCard}