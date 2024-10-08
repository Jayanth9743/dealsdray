import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const url = 'http://localhost:8000';
    const [employeeData, setEmployeeData] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        axios.get(`${url}/employee`)
            .then((response) => {
                console.log('API Response:', response.data);
                const employees = response.data.data || [];
                setEmployeeData(employees);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const contextValue = {
        employeeData,
        setEmployeeData,
        url,
        token,
    }

    return (
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    )

};

MainContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainContextProvider;