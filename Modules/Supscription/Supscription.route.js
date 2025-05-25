const express = require("express");
const router = express.Router();
const {addCard} = require('./Controller/Supscription.Controller');
const {requireAuth} = require('../../middleware/JWT');


router.post('/supscription', requireAuth, addCard);

module.exports = router