import axios from "axios";
import { useContext, useState } from "react";
import { MainContext } from "../context/MainContext";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
    const { url } = useContext(MainContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNo: '',
        designation: '',
        gender: '',
        course: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                course: value,
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
        data.append('course', formData.course);

        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await axios.post(`${url}/employee/create`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted successfully:', response.data);
            navigate('/employeeList');
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div className="flex items-center justify-center w-full mt-40 mb-4 ">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-[40%] gap-6 rounded-xl bg-secondary">
                <p className="mt-8 text-2xl font-bold">Create Employee</p>
                <div className="flex flex-col items-start justify-center w-4/5 gap-2 ">
                    <p className="text-lg font-semibold ">name</p>
                    <input type="text" className="w-full p-2 rounded-md" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange} />
                </div>
                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <p className="text-lg font-semibold ">email</p>
                    <input type="email" className="w-full p-2 rounded-md" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange} />
                </div>
                <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                    <p className="text-lg font-semibold ">mobile number</p>
                    <input type="text" className="w-full p-2 rounded-md"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange} />
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
                    <p className="text-lg font-semibold ">Gender</p>
                    <div className="flex items-center text-lg font-medium justify-around w-[60%]">
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
                    <p className="text-lg font-semibold ">course</p>
                    <div className="flex items-center text-lg font-medium justify-around w-[60%]">
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
                <div className="flex flex-col items-center justify-center w-4/5 gap-2 mt-8">
                    <p className="text-lg font-semibold ">image upload</p>
                    <input type="file" className="p-2 rounded-md"
                        name="image"
                        accept="image/png, image/jpeg"
                        onChange={handleChange} />
                </div>
                <button type="submit" className="w-[25%] mb-8 text-white text-lg rounded-md bg-blue-500 p-2">submit</button>
            </form>
        </div>
    );
}

export default CreateEmployee;
