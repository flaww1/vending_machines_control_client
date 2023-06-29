import './App.css';
import {Outlet} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
function App() {


    return (
        <div className="App">
            <Navbar/>
            <Outlet/>
            <div className="container text-center">
            </div>
            <Footer/>

        </div>


    );
}

export default App;

