import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true

    },
    course:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    createData:{
        type: Date,
        default: Date.now
    }
});

const employeeModel = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
export default employeeModel;