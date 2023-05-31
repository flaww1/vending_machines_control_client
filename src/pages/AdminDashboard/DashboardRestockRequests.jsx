import React, {useEffect, useState} from 'react';
import './AdminDashboard.css';


function DashboardRestockRequests() {

    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY4NTM2NDA2MCwiZXhwIjoxNjg3OTU2MDYwfQ.zbDnYOWxvplEBP3redatqu1N7DtO3vpdhE8nFJF8B_w';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        "Accept": 'application/json'
    }
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/dashboard/admin/requests', {headers})
            .then(response => response.json())
            .then(jsonResponse => setData(jsonResponse.restockRequests));
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
                    <a href="/dashboard/providers" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-gift me-2"></i>Providers
                    </a>
                    <a href="/dashboard/companies" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-comment-dots me-2"></i>Companies
                    </a>
                    <a href="/dashboard/maintenancerequests" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-comment-dots me-2"></i>Maintenance Requests
                    </a>
                    <a href="/dashboard/restockrequests" className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-comment-dots me-2"></i>Restock Requests
                    </a>

                </div>
            </div>
            {/* /#sidebar-wrapper */}

            {/* Page Content */}
            <div id="page-content-wrapper">
                <div className="container-fluid px-4">
                    <div className="row my-5">
                        <h3 className="fs-4 mb-3">Reservations</h3>
                        <div className="col">
                            <table className="table bg-white rounded shadow-sm table-hover">
                                <thead>
                                <tr>

                                    <th scope="col">ID</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Observations</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Machine</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Admin</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Claimed By</th>
                                    <th scope="col">Arrival Date</th>
                                    <th scope="col">isVerified</th>
                                    <th scope="col">Options</th>


                                </tr>
                                </thead>
                                <tbody>
                                {data.map(request => (

                                    <tr key={request.restockId}>
                                        <td>{request.restockId}</td>
                                        <td>{request.type}</td>
                                        <td>{request.priority}</td>
                                        <td>{request.status}</td>
                                        <td>{request.observations}</td>
                                        <td>{request.date}</td>
                                        <td>{request.machineId}</td>
                                        <td>{request.productId}</td>
                                        <td>{request.quantity}</td>
                                        <td>{request.adminId}</td>
                                        <td>{request.companyId}</td>
                                        <td>{request.claimedById}</td>
                                        <td>{request.arrival_date}</td>
                                        <td>{request.isVerified}</td>

                                        <td>
                                            <button className="btn btn-sm btn-outline-primary me-2">Edit
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>);

}


export default DashboardRestockRequests;
