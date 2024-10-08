import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
    const { url } = useContext(MainContext);
    const { employeeId } = useParams(); // Get employeeId from URL
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNo: '',
        designation: '',
        gender: '',
        course: '', // single course
        image: null
    });

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`${url}/employee/${employeeId}`);
                const employee = response.data;

                setFormData({
                    name: employee.name,
                    email: employee.email,
                    phoneNo: employee.phoneNo,
                    designation: employee.designation,
                    gender: employee.gender,
                    course: employee.course,
                    image: null // For image update, handle separately if needed
                });
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, [employeeId, url]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phoneNo', formData.phoneNo);
        data.append('designation', formData.designation);
        data.append('gender', formData.gender);
        data.append('course', formData.course); // single course

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.put(`${url}/employee/update/${employeeId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating the form:', error);
        }
    };

    return (
        <div className="flex items-center justify-center w-full mt-40 mb-4 ">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[40%] gap-6 rounded-xl bg-secondary">
                {/* The same form fields as in CreateEmployee */}
                <div className="flex flex-col items-start justify-center w-4/5 gap-2 mt-8">
                    <p className="text-lg font-semibold ">Name</p>
                    <input type="text" className="w-full p-2 rounded-md" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange} />
                </div>
                {/* ... Other fields remain the same ... */}
                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <p className="text-lg font-semibold ">Course</p>
                    <div className="flex items-center text-lg font-medium justify-around w-[60%]">
                        <label>
                            <input
                                type="radio"
                                name="course"
                                value="MCA"
                                checked={formData.course === 'MCA'}
                                onChange={handleChange}
                            />
                            MCA
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="course"
                                value="BCA"
                                checked={formData.course === 'BCA'} 
                                onChange={handleChange}
                            />
                            BCA
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="course"
                                value="BSC"
                                checked={formData.course === 'BSC'}
                                onChange={handleChange}
                            />
                            BSC
                        </label>
                    </div>
                </div>
                <button type="submit" className="w-[25%] mb-8 text-white text-lg rounded-md bg-blue-500 p-2">Update</button>
            </form>
        </div>
    );
}

export default UpdateEmployee;
