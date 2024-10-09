import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const url = 'http://localhost:8000';
    const [employeeData, setEmployeeData] = useState([]);
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [admin, setAdmin] = useState(null);
    const [loadingAdmin, setLoadingAdmin] = useState(true);
    const navigate = useNavigate(); // Initialize the navigation hook

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`${url}/employee`);
                const employees = response.data.data || [];
                setEmployeeData(employees);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchEmployeeData();
    }, []);

    useEffect(() => {
        const fetchAdminData = async () => {
            if (!token) {
                setLoadingAdmin(false);
                return;
            }

            try {
                const response = await axios.get(`${url}/admin`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAdmin(response.data.admin);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoadingAdmin(false);
            }
        };

        fetchAdminData();
    }, [token, url]);

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${url}/login`, credentials);
            const newToken = response.data.token; 
            sessionStorage.setItem("token", newToken);
            setToken(newToken); 
            navigate('/'); // Navigate to the root path after successful login
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const contextValue = {
        employeeData,
        setEmployeeData,
        url,
        token,
        admin,
        setToken,
        login,
        loadingAdmin,
    };

    return (
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    );
};

MainContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainContextProvider;
