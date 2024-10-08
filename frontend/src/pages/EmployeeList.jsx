import profile from '../assets/profile.jpg'

const EmployeeList = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 mt-32">
        <div className="flex items-center justify-between w-[80%]">
            <input type="text" className="w-[25%] border border-solid border-black p-2 rounded-md" placeholder="search for employees" />
            <button className="w-[20%] text-white p-2 shadow-xl rounded-md bg-green-500">create new employee</button>
        </div>

        <div className="flex items-center justify-center w-full">
        <table className="w-full mt-6">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">ID</th>
                        <th className="p-2">Image</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Mobile</th>
                        <th className="p-2">Gender</th>
                        <th className="p-2">designation</th>
                        <th className="p-2">Course</th>
                        <th className="p-2">Create date</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-300 ">
                        <td className="p-2 border border-gray-300">John Doe</td>
                        <td className="p-2 border border-gray-300"><img src={profile} className='object-contain w-12 h-12' alt="" /></td>
                        <td className="p-2 border border-gray-300">John Doe</td>
                        <td className="p-2 border border-gray-300">John Doe</td>
                        <td className="p-2 border border-gray-300">John Doe</td>
                        <td className="p-2 border border-gray-300">John Doe</td>
                        <td className="p-2 border border-gray-300">John Doe</td>
                        <td className="p-2 border border-gray-300">John Doe</td>
                        <td className="p-2 border border-gray-300">John Doe</td>
                        <td className="p-2 border border-gray-300 ">
                            <div className="flex items-center justify-around">
                                <button className='ml-1 text-blue-500'>edit</button>
                                <button className='mr-1 text-red-500'>delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default EmployeeList
