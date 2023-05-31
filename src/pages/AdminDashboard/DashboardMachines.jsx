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
        fetch('http://localhost:5000/dashboard/admin/machines', { headers })
            .then(response => response.json())
            .then(jsonResponse => setData(jsonResponse.machines));
    }, []);

    const handleDeleteMachine = (machineId) => {
        // Make a DELETE request to your API to delete the request with the given ID
        fetch(`http://localhost:5000/dashboard/admin/delete-machine/${machineId}`, {
            method: 'DELETE',
            headers: headers
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted machine from the data state
                    setData(prevData => prevData.filter(machine => machine.machineId !== machineId));
                } else {
                    console.error('Failed to delete machine');
                }
            })
            .catch(error => {
                console.error('Error occurred while deleting machine', error);
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
                        <h3 className="fs-4 mb-3">Machines</h3>
                        <div className="col">


                            <table className="table bg-white rounded shadow-sm table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((machine, index) => (
                                    <tr key={index}>
                                        <td>{machine.machineId}</td>
                                        <td>{machine.modelId}</td>
                                        <td>{machine.status}</td>
                                        <td>{machine.location}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary me-2">Edit
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteMachine(machine.machineId)}>Delete</button>
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
