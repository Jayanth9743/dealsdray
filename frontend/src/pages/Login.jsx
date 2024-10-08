import axios from "axios";
import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import { MainContext } from "../context/MainContext";

const Login = () => {
    const { url} = useContext(MainContext);
    const [visible, setVisible] = useState(false);
    const [register, setRegister] = useState(false);
    const [data, setData] = useState({name:"", email:"", password:""});
    const Navigate = useNavigate();

    const handleChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value});
    };

    const onLogin = async()=>{
        let newUrl = url;
        if(register){
            newUrl += "/admin/register"
        }else{
            newUrl += "/admin/login"
        }

        try{
            const response = await axios.post(newUrl, data);
            sessionStorage.setItem("token", response.data.token);
        if(response.data.sucess){
            // setLoading(false);
            console.log("login success", response.data.token);
            Navigate('/');
        }else{
            console.log("login failed");
        }
        }catch(error){
            console.log("login failed", error);
            alert("login failed please try again");
        }

    };


  return (
    <div className=' flex justify-center items-center  w-full h-[100vh]'>

        <div className=" flex flex-col w-[60%] h-[70%] justify-center items-center bg-primary gap-6 rounded-xl ">
            <h1 className="text-3xl font-bold">{!register ? "login": "register"}</h1>
            <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                <p className="text-lg font-semibold ">name</p>
                <input type="text" name="name"
                onChange={handleChange}
                className="w-full p-2 rounded-md" />
            </div>
            <div className={`flex flex-col items-start justify-center w-4/5 gap-2 ${register ? 'block' : 'hidden'}`}>
                <p className="text-lg font-semibold ">email</p>
                <input type="email"
                name="email"
                onChange={handleChange}
                className="w-full p-2 rounded-md" />
            </div>
            <div className="flex flex-col items-start justify-center w-4/5 gap-2">
                <div className='flex items-center justify-start w-full gap-2'>
                    <p className='xl:text-lg'>Password</p>
                    {
                        visible ?
                        (<FaEyeSlash className={`text-lg`} onClick={()=>setVisible(!visible)}/>):(
                            <FaEye className={`text-lg`} onClick={()=>setVisible(!visible)}/>
                        )
                    }
                </div>
                <input type={visible ? "text": "password"}
                name="password"
                onChange={handleChange}
                className="w-full p-2 rounded-md" />
            </div>
            <button className="w-[25%] text-white text-lg rounded-md bg-blue-500 p-2" onClick={onLogin}>{!register ? "login": "register"}</button>
            <div className="flex items-center justify-center w-full gap-2">
                <p>{register ? 'already have account' : 'dont have an account'}</p>
                <button className="text-lg text-blue-600" onClick={()=>{setRegister(!register)}}>{register ? 'login' : 'register'}</button>
            </div>
        </div>
      
    </div>
  )
}

export default Login
