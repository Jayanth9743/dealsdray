import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import MainContextProvider from './context/MainContext.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import CreateEmployee from './pages/CreateEmployee.jsx';
import UpdateEmployee from './pages/UpdateEmployee.jsx';
import Login from './pages/Login.jsx';
import EmployeeList from './pages/EmployeeList.jsx';
import Loading from './pages/Loading.jsx';
import Navbar from './components/Navbar.jsx';
import { Outlet } from 'react-router-dom';

// Layout component with Navbar and Outlet for nested routes
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

// Create the router using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/create',
        element: <CreateEmployee />,
      },
      {
        path: '/update/:employeeId',
        element: <UpdateEmployee />,
      },
      {
        path: '/employeeList',
        element: <EmployeeList />,
      },
      {
        path: '/loading',
        element: <Loading />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContextProvider>
      <RouterProvider router={router} />
    </MainContextProvider>
  </StrictMode>,
);
