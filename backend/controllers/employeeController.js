import employeeModel from "../models/employeeModel.js";


const createEmployee = async(req, res)=>{
    const imageFile = `${req.file.filename}`;
    const {name, email, phoneNo, designation, gender, course} = req.body;
    
    const newEmployee = new employeeModel({
        name,
        email,
        phoneNo,
        designation,
        gender,
        course,
        image : imageFile,
    });

    try{
        const savedEmployee = await newEmployee.save();
        res.status(201).json({sucess:true, data: savedEmployee});
    }catch(err){
        return res.status(500).json({sucess:false, message: err.message});
    }
};

const getEmployees = async(req, res)=>{
    try{
        const employees = await employeeModel.find();
        res.status(200).json({sucess:true, data: employees});
    }catch(err){
        return res.status(500).json({sucess:false, message: err.message});
    }
};

const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNo, designation, gender, course } = req.body;
  
    try {
      const updatedEmployee = await employeeModel.findByIdAndUpdate(
        id,
        { name, email, phoneNo, designation, gender, course },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
  
      res.status(200).json({ success: true, data: updatedEmployee });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
  export { createEmployee, getEmployees, updateEmployee };