import express from "express";
import authAdmin from "../middlewares/auth.js";
import { adminRegister, adminLogin, getAdmin } from "../controllers/adminController.js";

const adminRoute = express.Router();

adminRoute.post("/register", adminRegister);
adminRoute.post("/login", adminLogin);
adminRoute.get("/", authAdmin, getAdmin);

export default adminRoute;

