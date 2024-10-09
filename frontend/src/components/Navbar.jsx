import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { MainContext } from "../context/MainContext";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";

const Navbar = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { url, token } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${url}/admin`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Admin data fetched:", response.data.admin); // Debugging log
        setAdmin(response.data.admin);
      } catch (error) {
        console.log("Error fetching admin:", error);
      } finally {
        setLoading(false); // Set loading to false after admin data is set or if there is an error
      }
    };
    fetchAdmin();
  }, [token, url]);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate('/login');
  };

  if (loading) {
    return <Loading />;
  }

  console.log("Admin state before rendering:", admin); // Debugging log

  return (
    <div className="fixed top-0 flex flex-col items-start justify-center w-full h-24 bg-primary">
      <div className="flex items-center justify-between w-full h-[49%]">
        <p className="ml-4 text-2xl font-bold text-gray-600">DealsDray Assignment</p>
        {admin ? (
          <p className="mr-4 text-xl font-bold text-gray-600">Welcome {admin.name}!</p>
        ) : (
          <p className="mr-4 text-xl font-bold text-gray-600">Welcome!</p>
        )}
      </div>
      <hr className="w-full border-black border-solid" />
      <div className="flex items-center justify-around w-full text-lg font-semibold h-[49%] bg-primary">
        <NavLink to='/'>Home</NavLink>
        <NavLink to="/employeeList">Employee List</NavLink>
        <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={logout}>
          <p>Logout</p>
          <MdOutlineLogout />
        </div>
      </div>
    </div>
  );
};

export default Navbar;