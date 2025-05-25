const express = require("express");
const router = express.Router();
const {addData} = require('./Controller/Form.Controller');
const {requireAuth} = require('../../middleware/JWT');


router.post('/from', requireAuth, addData);

module.exports = router