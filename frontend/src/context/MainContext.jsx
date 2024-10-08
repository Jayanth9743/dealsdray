import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
    const url = 'http://localhost:8000';
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(()=>{
        axios.get(`${url}/employee`)
        .then((response)=>{
            setEmployeeData(response.data);
            console.log('Data fetched successfully: ', response.data);
        })
        .catch((error)=>{
            console.error('Error fetching data: ', error);
        })
    },[]);

    const contextValue = {
        employeeData,
        setEmployeeData,
        url,
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