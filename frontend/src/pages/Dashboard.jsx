import { useNavigate } from "react-router-dom"


const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full gap-8 mt-32">
            <p className="text-2xl font-bold">Dashboard</p>
            <button className="w-[20%] text-white p-2 shadow-xl rounded-md bg-blue-500 hover:bg-green-500" onClick={()=>navigate('/employeeList')} >view employee list</button>
            <button className="w-[20%] text-white p-2 shadow-xl rounded-md bg-blue-500 hover:bg-green-500" onClick={()=>navigate('/create')}>create new employee</button>
    </div>
  )
}

export default Dashboard
