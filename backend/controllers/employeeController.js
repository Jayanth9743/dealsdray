import employeeModel from "../models/employeeModel.js";


const createEmployee = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
  }

  const imageFile = req.file.filename;
  const { name, email, phoneNo, designation, gender, course } = req.body;

  const newEmployee = new employeeModel({
      name,
      email,
      phoneNo,
      designation,
      gender,
      course,
      image: imageFile,
  });

  try {
      const savedEmployee = await newEmployee.save();
      res.status(201).json({ success: true, data: savedEmployee });
  } catch (err) {
      console.error('Error saving employee:', err);
      return res.status(500).json({ success: false, message: err.message });
  }
};


const getEmployees = async(req, res)=>{
  const {employeeId} = req.query;
  const query = employeeId ? { employeeId } : {};
    try{
        const employees = await employeeModel.find(query);
        res.status(200).json({sucess:true, data: employees});
    }catch(err){
        return res.status(500).json({sucess:false, message: err.message});
    }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNo, designation, gender, course } = req.body;
  const image = req.file ? req.file.filename : ''; // Check if a file is uploaded

  try {
      const updateData = {
          name,
          email,
          phoneNo,
          designation,
          gender,
          course,
          createDate: Date.now()
      };

      // Conditionally add the image field only if a new file is provided
      if (image) {
          updateData.image = image;
      }

      const updatedEmployee = await employeeModel.findByIdAndUpdate(
          id,
          updateData,
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


  const deleteEmployee =async(req, res)=>{
    const { id } = req.params;
  
    try {
      const deletedEmployee = await employeeModel.findByIdAndDelete(id);
  
      if (!deletedEmployee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
  
      res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
  
  export { createEmployee, getEmployees, updateEmployee, deleteEmployee };