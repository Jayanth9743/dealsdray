import express from "express";
import authAdmin from "../middlewares/auth.js";
import { createEmployee, updateEmployee, getEmployees } from "../controllers/employeeController.js";
import multer from "multer";

const employeeRoute = express.Router();

//images upload
const storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
      return callback(null, `${Date.now()}${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage });

employeeRoute.post("/create",authAdmin,upload.single("image"), createEmployee);
employeeRoute.get("/",authAdmin, getEmployees);
employeeRoute.patch("/update/:id",authAdmin,upload.single("image"), updateEmployee);

export default employeeRoute;