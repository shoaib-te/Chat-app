import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authmiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization && req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export{
        authmiddleware
}