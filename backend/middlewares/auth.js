import jwt from 'jsonwebtoken';

const authAdmin = (req, res, next) =>{
    const token  =req.header.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({sucess:false, message: 'Not authorized, login again!'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = { id: decoded.id };
        next();
    }catch(err){
        return res.status(500).json({sucess:false, message: err.message});
    }
}