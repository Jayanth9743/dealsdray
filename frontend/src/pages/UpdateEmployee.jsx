import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import axios from "axios";

const UpdateEmployee = () => {
    const { employeeId } = useParams();
    const { employeeData, url } = useContext(MainContext);
    const [oldImg, setOldImg] = useState('');
    const navigate = useNavigate();
    
    
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
    
        const employee = employeeData.find(emp => emp._id === employeeId);
        console.log('Employee found:', employee); 
    
       
        if (employee) {
            setFormData({
                name: employee.name || '',
                email: employee.email || '',
                phoneNo: employee.phoneNo || '',
                designation: employee.designation || '',
                gender: employee.gender || '',
                course: employee.course || '', 
                image: employee.image || null, 
            });
            setOldImg(employee.image);
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
            const updatedCourse = formData.course === value ? '' : value;
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
            navigate('/employeeList')
            console.log('Form updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating the form:', error);
        }
    };

    return (
        <div className="flex items-center justify-center w-full mt-40 mb-4">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[40%] gap-6 rounded-xl bg-secondary">
            <p className="mt-8 text-2xl font-bold">Update Employee</p>
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
                    <p className="text-lg font-semibold ">designation</p>
                    <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full p-2 border border-black border-solid rounded-md">
                        <option value="" disabled>
                            Select Designation
                        </option>
                        <option value="Hr">Hr</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>

                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <label className="text-lg font-semibold">Gender</label>
                    <div className="flex items-center gap-4">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Others"
                                checked={formData.gender === 'Others'}
                                onChange={handleChange}
                            />
                            Others
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

                <div className="flex flex-col items-start justify-center w-4/5 gap-6">

                    {oldImg == formData.image ? (
                        <div className="flex flex-col items-center justify-center w-full gap-4">
                        <p className="text-lg font-semibold">Existing image</p>
                        <img src={`${url}/images/${formData.image}`} alt={`${formData.image}`} className="w-[25%] h-[25%] object-contain" />
                    </div>
                    ):(<></>)}

                    <label className="text-lg font-semibold" htmlFor="image">New Image Upload</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleChange}
                        className="p-2 border rounded"
                    />
                </div>

                <button type="submit" className="w-4/5 p-2 mb-6 text-white bg-blue-500 rounded">
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
