import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [visible, setVisible] = useState(false);
  return (
    <div className=' flex justify-center items-center  w-full h-[100vh]'>

        <div className=" flex flex-col w-[60%] h-[70%] justify-center items-center bg-primary gap-6 rounded-xl ">
            <h1 className="text-3xl font-bold">Login</h1>
            <div className="flex flex-col justify-center items-start gap-2 w-4/5">
                <p className=" text-lg font-semibold">name</p>
                <input type="text" className="w-full p-2 rounded-md" />
            </div>
            <div className="flex flex-col justify-center items-start gap-2 w-4/5">
                <p className=" text-lg font-semibold">email</p>
                <input type="email" className="w-full p-2 rounded-md" />
            </div>
            <div className="flex flex-col justify-center items-start gap-2 w-4/5">
                <div className='flex items-center justify-start w-full gap-2'>
                    <p className='xl:text-lg'>Password</p>
                    {
                        visible ?
                        (<FaEyeSlash className={`text-lg`} onClick={()=>setVisible(!visible)}/>):(
                            <FaEye className={`text-lg`} onClick={()=>setVisible(!visible)}/>
                        )
                    }
                </div>
                <input type={visible ? "text": "password"} className="w-full p-2 rounded-md" />
            </div>
            <button className="w-[25%] text-white text-lg rounded-md bg-blue-500 p-2">register</button>
            <div className="flex justify-center items-center w-full gap-2">
                <p>already have account</p>
                <button className="text-lg text-blue-600">login</button>
            </div>
        </div>
      
    </div>
  )
}

export default Login
