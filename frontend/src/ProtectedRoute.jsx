// ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';;
import { MainContext } from './context/MainContext';
import Loading from './pages/Loading';

const ProtectedRoute = ({ children }) => {
    const { token, loadingAdmin } = useContext(MainContext); // Fetch loading state
    const isAuthenticated = !!token;

    if (loadingAdmin) {
        return <Loading />; // Show loading spinner while fetching
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
