import React, {useEffect, useState} from 'react';
import './AdminDashboard.css';


function DashboardProviders() {

    const token =localStorage.getItem('usertoken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        "Accept": 'application/json'
    }
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/dashboard/admin/providers', {headers})
            .then(response => response.json())
            .then(jsonResponse => setData(jsonResponse.providers));
    }, []);
    return (
        <div className="d-flex" id="wrapper">
            {/* Sidebar */}
            <div className="bg-white" id="sidebar-wrapper">
                <div
                    className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"></div>
                <div className="list-group list-group-flush my-3">
                    <a href="/dashboard/products" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-project-diagram me-2"></i>Products
                    </a>
                    <a href="/dashboard/machines" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-chart-line me-2"></i>Machines
                    </a>
                    <a href="/dashboard/users" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-paperclip me-2"></i>Users
                    </a>
                    <a href="/dashboard/reservations" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-shopping-cart me-2"></i>Reservations
                    </a>


                </div>
            </div>
            {/* /#sidebar-wrapper */}

            {/* Page Content */}
            <div id="page-content-wrapper">
                <div className="container-fluid px-4">
                    <div className="row my-5">
                        <h3 className="fs-4 mb-3">Providers</h3>
                        <div className="col">
                            <table className="table bg-white rounded shadow-sm table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Company</th>

                                </tr>
                                </thead>
                                <tbody>
                                {data.map((provider) => {
                                    return (
                                        <tr key={provider.providerId}>

                                            <th scope="row">{provider.providerId}</th>
                                            <td>{provider.User.first_name}</td>
                                            <td>{provider.phone}</td>
                                            <td>{provider.User.email}</td>
                                            <td>{provider.Company.name}</td>

                                        </tr>
                                    )
                                })
                                }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>);

}


export default DashboardProviders;
