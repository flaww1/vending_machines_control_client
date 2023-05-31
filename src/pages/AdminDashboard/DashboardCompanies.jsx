import React, {useEffect, useState} from 'react';
import './AdminDashboard.css';


function DashboardMachines() {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY4NTM2NDA2MCwiZXhwIjoxNjg3OTU2MDYwfQ.zbDnYOWxvplEBP3redatqu1N7DtO3vpdhE8nFJF8B_w';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        "Accept": 'application/json'
    }
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/dashboard/admin/companies', { headers })
            .then(response => response.json())
            .then(jsonResponse => setData(jsonResponse.companies));
    }, []);

    const handleDeleteRequest = (requestId) => {
        // Make a DELETE request to your API to delete the request with the given ID
        fetch(`http://localhost:5000/dashboard/admin/requests/${requestId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    // Request deleted successfully, update the data state to reflect the changes
                    setData(prevData => ({
                        ...prevData,
                        maintenanceRequests: prevData.maintenanceRequests.filter(request => request.id !== requestId),
                        restockRequests: prevData.restockRequests.filter(request => request.id !== requestId)
                    }));
                } else {
                    // Handle error case when deletion fails
                    console.error('Failed to delete request');
                }
            })
            .catch(error => {
                console.error('Error occurred while deleting request', error);
            });
    };


    return (
        <div className="d-flex" id="wrapper">
            {/* Sidebar */}
            <div className="bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"></div>
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
                        <h3 className="fs-4 mb-3">Companies</h3>
                        <div className="col">


                            <table className="table bg-white rounded shadow-sm table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Registration Date</th>
                                    <th scope="col">Street</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Postal Code</th>
                                    <th scope="col">NIF</th>


                                    <th scope="col">Options</th>

                                </tr>
                                </thead>
                                <tbody>
                                {data.map((company, index) => (
                                    <tr key={index}>
                                        <th scope="row">{company.companyId}</th>
                                        <td>{company.type}</td>
                                        <td>{company.name}</td>
                                        <td>{company.companyEmail}</td>
                                        <td>{company.companyPhone}</td>
                                        <td>{company.registration_date}</td>
                                        <td>{company.street}</td>
                                        <td>{company.country}</td>
                                        <td>{company.city}</td>
                                        <td>{company.postal_code}</td>
                                        <td>{company.nif}</td>

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
        </div>
    );
}

export default DashboardMachines;
