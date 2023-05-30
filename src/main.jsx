import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import './index.css';
import './components/Navbar/Navbar.css';
import './components/Footer/Footer.css';
import './pages/Login/Login.css';
import './pages/Registration/Registration.css';
import './pages/Home/Home.css';
import './pages/Products/Products.css';
import './components/ProductCard/ProductCard.css';
import App from "./App.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import Products from "./pages/Products/Products.jsx";
import ProductPage from "./pages/Products/ProductPage.jsx";


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
        }

    ]
},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
