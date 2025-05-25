const express = require("express");
const router = express.Router();
const { Register, Login } = require("./Controller/Auth.controller");

router.post("/Register", Register);

router.post("/login", Login);


module.exports = router;
