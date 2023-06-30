import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import Modal from 'react-modal';
import CreateUserForm from '../../components/CreateForms/CreateUserForm.jsx';

function DashboardUsers() {
    const [isCreateUserFormOpen, setCreateUserFormOpen] = useState(false);

    const handleCreateUserClick = () => {
        setCreateUserFormOpen(true);
    };

    const token =localStorage.getItem('usertoken');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/dashboard/admin/users', { headers })
            .then((response) => response.json())
            .then((jsonResponse) => setData(jsonResponse.users));
    }, []);

    return (
        <div className="d-flex" id="wrapper">
            {/* Sidebar */}
            <div className="bg-white" id="sidebar-wrapper">
                <div
                    className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"></div>
                <div className="list-group list-group-flush my-3">
                    <a href="/dashboard/products"
                       className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-project-diagram me-2"></i>Products
                    </a>
                    <a href="/dashboard/machines"
                       className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-chart-line me-2"></i>Machines
                    </a>
                    <a href="/dashboard/users"
                       className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-paperclip me-2"></i>Users
                    </a>
                    <a href="/dashboard/reservations"
                       className="list-group-item list-group-item-action bg-transparent second-text fw-bold">
                        <i className="fas fa-shopping-cart me-2"></i>Reservations
                    </a>


                </div>
            </div>
            {/* /#sidebar-wrapper */}

            {/* Page Content */}
            <div id="page-content-wrapper">
                <div className="container-fluid px-4">
                    <div className="row my-5">
                        <h3 className="fs-4 mb-3">Users</h3>
                        <div className="col">
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreateUserClick}>
                                    Create User
                                </button>
                            </div>
                            <table className="table bg-white rounded shadow-sm table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Registration Date</th>


                                </tr>
                                </thead>
                                <tbody>
                                {data.map((user) => {
                                    return (
                                        <tr key={user.userId}>
                                            <td>{user.userId}</td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.type}</td>
                                            <td>{user.registration_date}</td>


                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <Modal
                isOpen={isCreateUserFormOpen}
                onRequestClose={() => setCreateUserFormOpen(false)}
                contentLabel="Create User Modal"
                ariaHideApp={false}
            >
                <CreateUserForm />
            </Modal>
        </div>
    );
}

export default DashboardUsers;
