import React, {useEffect, useState} from 'react';
import './AdminDashboard.css';


function DashboardMaintenanceRequests() {

    const token =
        localStorage.getItem('usertoken');    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        "Accept": 'application/json'
    }
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/dashboard/admin/requests', {headers})
            .then(response => response.json())
            .then(jsonResponse => setData(jsonResponse.maintenanceRequests));
    }, []);

    const handleDeleteMaintenance = (userId) => {
        fetch(`http://localhost:5000/dashboard/admin/delete-maintenance/${maintenanceId}`, {
            method: 'DELETE',
            headers: headers

        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted user from the data state
                    setData(prevData => prevData.filter(user => user.userId !== userId));
                } else {
                    console.error('Failed to delete user');
                }
            })
            .catch(error => {
                console.error('Error occurred while deleting user', error);
            });
    };
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
                        <h3 className="fs-4 mb-3">Reservations</h3>
                        <div className="col">
                            <table className="table bg-white rounded shadow-sm table-hover">
                                <thead>
                                <tr>

                                    <th scope="col">ID</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Priotity</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Observations</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Machine</th>
                                    <th scope="col">Admin</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Claimed By</th>
                                    <th scope="col">isVerified</th>
                                    <th scope="col">Options</th>


                                </tr>
                                </thead>
                                <tbody>
                                {data.map(request => (

                                    <tr key={request.maintenanceId}>
                                        <td>{request.maintenanceId}</td>
                                        <td>{request.type}</td>
                                        <td>{request.priority}</td>
                                        <td>{request.status}</td>
                                        <td>{request.observations}</td>
                                        <td>{request.date}</td>
                                        <td>{request.machineId}</td>
                                        <td>{request.adminId}</td>
                                        <td>{request.companyId}</td>
                                        <td>{request.claimedById}</td>
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


export default DashboardMaintenanceRequests
