import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "This-is-my-jwt-secret-key";


export const authorization = (req,res,next)=>{

    try{

        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message:"No token provided"
            });
        }


        const decoded = jwt.verify(token,JWT_SECRET);

        req.user = decoded;

        next();


    }catch(error){

        return res.status(401).json({
            message:"Invalid token"
        });

    }

};



export const adminOnly = (req,res,next)=>{

    if(req.user.role !== "admin"){

        return res.status(403).json({
            message:"Access denied. Admin only"
        });

    }

    next();

};

export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. Required role: ${allowedRoles.join(" or ")}`
            });
        }

        next();
    };
};


