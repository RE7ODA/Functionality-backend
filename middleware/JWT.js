const jwt = require("jsonwebtoken");
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token not found" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, "secret")
        req.user = decoded;
        next();
    }catch (err) {
        return res.status(401).json({status : "error" , message : "Invalid Token"})
    }
};

module.exports = {requireAuth} ;