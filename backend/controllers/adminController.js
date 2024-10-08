import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";


const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}


const adminRegister = async(req, res)=>{
    const {name,email, password} = req.body;
    try{
        const admin = await adminModel.findOne({email});
        if(admin){
            return res.status(400).json({sucess:false, message: "Admin already exists"});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({sucess:false, message: "Please enter a valid email address"});
        };

        if(password.length < 6){
            return res.status(400).json({sucess:false, message: "Password should be atleast 6 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new adminModel({
            name,
            email,
             password: hashedPassword
            });
        const savedAdmin = await newAdmin.save();
        const token = createToken(savedAdmin._id);
        res.status(201).json({sucess:true, token});
    }catch(err){
        return res.status(500).json({sucess:false, message: err.message});
    }
}

const adminLogin = async(req, res)=>{
    const {name, password} = req.body;
    try{
        const admin = await adminModel.findOne({name});
        if(!admin){
            return res.status(400).json({sucess:false, message: "Admin does not exist"});
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({sucess:false, message: "Invalid credentials"});
        }
        const token = createToken(admin._id);
        res.status(200).json({sucess:true, token});
    }catch(err){
        return res.status(500).json({sucess:false, message: err.message});
    }
};

const getAdmin = async(req, res)=>{
    try{
        const admin = await adminModel.findById(req.admin._id);
        res.status(200).json({sucess:true, admin});
    }catch(err){
        return res.status(500).json({sucess:false, message: err.message});
    }
}

export {adminRegister, adminLogin, getAdmin};
