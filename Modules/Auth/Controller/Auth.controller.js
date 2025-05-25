const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../../../DB/models/Auth.model");

const Register = async (req, res) => {
    try {
        const { usersName, email, password , role} = req.body;
        const emailExists = await users.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already in use" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        await users.create({usersName, email, password , role});
        return res.status(201).json({ message: "User created successfully", user: req.body });
    } catch (err) {
        return res.status(401).json({ message: "User not successful created", err: err.message });
    }
}
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const FindUser = await users.findOne({ email });
        if (!FindUser) {
            return res.status(400).json({ message: "Email not found" });
        }
        const match = await bcrypt.compare(password, FindUser.password);
        if (!match) {
            return res.status(400).json({ message: "Password not correct" });
        }
        let token = jwt.sign({ id: FindUser._id , role: FindUser.role }, "secret");
        return res.status(200).json({ message: "Login successful", user: FindUser, token });
    } catch (err) {
        return res.status(401).json({ message: "User not Found", err: err.message });
    }
}
module.exports = {
    Register,
    Login
}