const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");

const authenticate = async (req , res,next)=>{
    try{
        const token = req.cookies.jwtoken;
        const  verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootuser = await user.findOne({ _id:verifyToken._id , "tokens.token":token});
        if(!rootuser){
            throw new Error('user not found')
        }
        req.token = token;
        req.rootuser = rootuser;
        req.userID = rootuser._id;
        next();
    }catch(err){
        res.status(401).send("Unauthorized: no token provided");
        console.log(err);
    }

}
module.exports = authenticate;