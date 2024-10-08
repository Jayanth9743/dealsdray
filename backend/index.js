import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import adminRoute from "./routes/adminRoute.js";
import employeeRoute from "./routes/employeeRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoute);
app.use("/employee", employeeRoute);
app.use("/images", express.static("images"));

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});