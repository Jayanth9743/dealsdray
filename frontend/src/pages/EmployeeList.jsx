import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
    const { employeeData, setEmployeeData, url } = useContext(MainContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const filteredEmployee = search.length > 0 
        ? employeeData.filter(employee => 
            employee.name.toLowerCase().includes(search.toLowerCase())
          )
        : employeeData;

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${url}/employee`);
                setEmployeeData(response.data.data || []);
            } catch (error) {
                console.error('Error fetching employee data: ', error);
            }
        };

        fetchEmployees();
    }, [url, setEmployeeData]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`${url}/employee/delete/${id}`);
                console.log('Delete response:', response);
                const updatedEmployees = employeeData.filter(employee => employee._id !== id);
                setEmployeeData(updatedEmployees);
            } catch (error) {
                console.log('Error deleting employee:', error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full gap-6 mt-32">
            <p className='text-2xl font-bold'>Employee List</p>
            <div className="flex items-center justify-between w-[80%]">
                <input 
                    type="text" 
                    className="w-[25%] border border-solid border-black p-2 rounded-md" 
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button 
                    className="w-[20%] text-white p-2 shadow-xl rounded-md bg-green-500" 
                    onClick={() => navigate('/create')}
                >
                    Create New Employee
                </button>
            </div>

            <div className="flex items-center justify-center w-full">
                {filteredEmployee.length > 0 ? (
                    <table className="w-full mt-6">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2">ID</th>
                                <th className="p-2">Image</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Mobile</th>
                                <th className="p-2">Gender</th>
                                <th className="p-2">Designation</th>
                                <th className="p-2">Course</th>
                                <th className="p-2">Create Date</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployee.map(employee => (
                                <tr key={employee._id} className="border-b border-gray-300">
                                    <td className="p-2 border border-gray-300">{employee._id}</td>
                                    <td className="p-2 border border-gray-300">
                                        <img 
                                            src={`${url}/images/${employee.image}`} 
                                            className='object-contain w-12 h-12' 
                                            alt="Employee" 
                                        />
                                    </td>
                                    <td className="p-2 border border-gray-300">{employee.name}</td>
                                    <td className="p-2 border border-gray-300">{employee.email}</td>
                                    <td className="p-2 border border-gray-300">{employee.phoneNo}</td>
                                    <td className="p-2 border border-gray-300">{employee.gender}</td>
                                    <td className="p-2 border border-gray-300">{employee.designation}</td>
                                    <td className="p-2 border border-gray-300">{employee.course}</td>
                                    <td className="p-2 border border-gray-300">{employee.createData}</td>
                                    <td className="p-2 border border-gray-300">
                                        <div className="flex items-center justify-around">
                                            <button 
                                                className='ml-1 text-blue-500' 
                                                onClick={() => navigate(`/update/${employee._id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className='mr-1 text-red-500' 
                                                onClick={() => handleDelete(employee._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="mt-4 text-xl font-semibold text-red-500">No employees found</p>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;
