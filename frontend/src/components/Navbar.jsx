import { useContext } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { MainContext } from "../context/MainContext";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";

const Navbar = () => {
    const { admin, setToken, loadingAdmin } = useContext(MainContext); // Access loadingAdmin
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("token");
        setToken(null); // Clear the token in context
        navigate('/login'); // This is now inside a component that has access to the Router
    };

    if (loadingAdmin) { // Show loading while admin data is being fetched
        return <Loading />;
    }

    return (
        <div className="fixed top-0 flex flex-col items-start justify-center w-full h-24 bg-primary">
            <div className="flex items-center justify-between w-full h-[49%]">
                <p className="ml-4 text-2xl font-bold text-gray-600">DealsDray Assignment</p>
                <p className="mr-4 text-xl font-bold text-gray-600">
                    Welcome {admin ? admin.name : "!"}
                </p>
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
