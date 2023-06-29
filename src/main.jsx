import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';


import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom';

import './index.css';
import './components/Navbar/Navbar.css';
import './components/Footer/Footer.css';
import './pages/Login/Login.css';
import './pages/Registration/Registration.css';
import './pages/Home/Home.css';
import './pages/Products/Products.css';
import './components/ProductCard/ProductCard.css';
import './pages/Products/ProductPage.css';
import './pages/Machines/Machines.css';
import './pages/Machines/MachinePage.css';
import './components/MachineCard/MachineCard.css';
import './pages/AdminDashboard/AdminDashboard.css';
import App from "./App.jsx";
import Home from './pages/Home/Home';
import UserReservations from "./pages/Reservations/Reservations.jsx";
import Login from './pages/Login/Login';
import Registration from "./pages/Registration/Registration.jsx";
import Products from "./pages/Products/Products.jsx";
import ProductPage from "./pages/Products/ProductPage.jsx";
import Machines from "./pages/Machines/Machines.jsx";
import MachinePage from "./pages/Machines/MachinePage.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import DashboardProducts from "./pages/AdminDashboard/DashboardProducts.jsx";
import DashboardMachines from "./pages/AdminDashboard/DashboardMachines.jsx";
import DashboardReservations from "./pages/AdminDashboard/DashboardReservations.jsx";
import DashboardProviders from "./pages/AdminDashboard/DashboardProviders.jsx";
import DashboardUsers from "./pages/AdminDashboard/DashboardUsers.jsx";
import DashboardMaintenanceRequests from "./pages/AdminDashboard/DashboardMaintenanceRequests.jsx";
import DashboardRestockRequests from "./pages/AdminDashboard/DashboardRestockRequests.jsx";
import DashboardCompanies from "./pages/AdminDashboard/DashboardCompanies.jsx";


const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/registration",
            element: <Registration/>,
        },
        {
            path: "/products",
            element: <Products/>,
        },
        {
            path: "/products/:productId",
            element: <ProductPage/>,

        },
        {
          path: "/machines",
            element: <Machines/>,
        },
        {
           path: "/reservations",
            element: <UserReservations/>,
        },
        {
            path: "/machine/:machineId",
            element: <MachinePage/>,
        },
        {
            path: "/dashboard",
            element: <AdminDashboard/>,
        },
        {
            path: "/dashboard/products",
            element: <DashboardProducts/>,
        },
        {
            path: "/dashboard/machines",
            element: <DashboardMachines/>,
        },
        {
            path: "/dashboard/reservations",
            element: <DashboardReservations/>,
        },
        {
            path: "/dashboard/providers",
            element: <DashboardProviders/>,
        },
        {
            path: "/dashboard/users",
            element: <DashboardUsers/>,
        },
        {
            path: "/dashboard/maintenancerequests",
            element: <DashboardMaintenanceRequests/>,
        },
        {
            path: "/dashboard/restockrequests",
            element: <DashboardRestockRequests/>,
        },
        {
            path: "/dashboard/companies",
            element: <DashboardCompanies/>,
        },







    ]
},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
