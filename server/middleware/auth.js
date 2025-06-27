import jwt from 'jsonwebtoken'

const auth = (req, res, next) =>{
    const token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // email + role
        next();
    }catch(error){
        res.json({success: false, message: "Invalid Token"});
    }
}

export default auth;
