import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { MainContext } from "../context/MainContext";

const Navbar = () => {
  const [admin, setAdmin] = useState(false);
  const { url, token} = useContext(MainContext);
  useEffect(()=>{
    const fetchAdmin = async()=>{
      try{
        const response = await axios.get(`${url}/admin`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAdmin(response.data.admin);
      }catch(error){
        console.log("error fetching admin", error);
      }
    };
    fetchAdmin();
  },[token, url])
  return (
    <div className="fixed top-0 flex flex-col items-start justify-center w-full h-24 bg-primary">
      <div className="flex items-center justify-between w-full h-[49%]">
        <p className="ml-4 text-2xl font-bold text-gray-600">DealsDray Assignment</p>
        <p className="mr-4 text-xl font-bold text-gray-600">Welcome {admin.name} !</p>
      </div>
      <hr  className="w-full border-black border-solid"/>
      <div className="flex items-center justify-around w-full text-lg font-semibold h-[49%] bg-primary">
            <p>Home</p>
            <p>Employee List</p>
            <div className="flex items-center justify-center gap-2">
                <p>Logout</p> 
                <MdOutlineLogout/>
            </div>
      </div>
    </div>
  )
}

export default Navbar
