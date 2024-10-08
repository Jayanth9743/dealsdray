import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MainContextProvider from './context/MainContext.jsx'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx'
import CreateEmployee from './pages/CreateEmployee.jsx'
import UpdateEmployee from './pages/UpdateEmployee.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([{
  path: '/',
  element: (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  ),
  children:[
    {
      path: '/',
      element: <App/>
    },
    {
      path:"/create",
      element: <CreateEmployee/>
    },
    {
      path:"/update/:employeeId",
      element: <UpdateEmployee/>
    }
  ]
},
  {
    path: '/login',
  element: <Login/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContextProvider>
      <RouterProvider router={router} />
    </MainContextProvider>
  </StrictMode>,
)
