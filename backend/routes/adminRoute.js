import express from "express";
import { adminRegister, adminLogin } from "../controllers/adminController";

const adminRoute = express.Router();

adminRoute.post("/register", adminRegister);
adminRoute.post("/login", adminLogin);

export default adminRoute;

