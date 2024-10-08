import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import axios from "axios";

const UpdateEmployee = () => {
    const { employeeId } = useParams();
    const { employeeData, url } = useContext(MainContext);
    
    // Initialize formData with empty strings
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNo: '',
        designation: '',
        gender: '',
        course: '',
        image: null,
    });

    useEffect(() => {
        console.log('Employee ID from URL:', employeeId); // Log the employeeId
        console.log('Employee Data:', employeeData); // Log the entire employeeData array
    
        // Find the employee by ID
        const employee = employeeData.find(emp => emp._id === employeeId);
        console.log('Employee found:', employee); // Check if employee is found
    
        // If employee is found, set the form data
        if (employee) {
            setFormData({
                name: employee.name || '',
                email: employee.email || '',
                phoneNo: employee.phoneNo || '',
                designation: employee.designation || '',
                gender: employee.gender || '',
                course: employee.course || '', // Ensure this is set correctly
                image: null // Reset image if not updating
            });
        }
    }, [employeeId, employeeData]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else if (type === 'checkbox') {
            // Handle checkbox logic for course if needed
            const updatedCourse = formData.course === value ? '' : value; // Toggle logic
            setFormData((prevData) => ({
                ...prevData,
                course: updatedCourse,
            }));
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
        data.append('course', formData.course || '');

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.patch(`${url}/employee/update/${employeeId}`, data, {
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
        <div className="flex items-center justify-center w-full mt-40 mb-4">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[40%] gap-6 rounded-xl bg-secondary">
                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <label className="text-lg font-semibold" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <label className="text-lg font-semibold" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <label className="text-lg font-semibold" htmlFor="phoneNo">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNo"
                        id="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <label className="text-lg font-semibold" htmlFor="designation">Designation</label>
                    <input
                        type="text"
                        name="designation"
                        id="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <label className="text-lg font-semibold">Gender</label>
                    <div className="flex items-center gap-4">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <p className="text-lg font-semibold">Course</p>
                    <div className="flex items-center justify-around w-[60%]">
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="MCA"
                                checked={formData.course === 'MCA'}
                                onChange={handleChange}
                            />
                            MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BCA"
                                checked={formData.course === 'BCA'}
                                onChange={handleChange}
                            />
                            BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BSC"
                                checked={formData.course === 'BSC'}
                                onChange={handleChange}
                            />
                            BSC
                        </label>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <label className="text-lg font-semibold" htmlFor="image">Image Upload</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                </div>

                <button type="submit" className="w-4/5 p-2 text-white bg-blue-500 rounded">
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
