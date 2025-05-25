const express = require("express");
const router = express.Router();
const {CreateData , GetData , UpdateData , DeleteData} = require('./Controller/AdviceRequest.controller');
const {requireAuth} = require('../../middleware/JWT');


router.post('/functionality', requireAuth, CreateData);
router.get('/functionality', requireAuth, GetData);
router.put('/functionality/:postId', requireAuth, UpdateData);
router.delete('/functionality/:postId', requireAuth, DeleteData);

module.exports = router