import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import CreateMachineForm from '../../components/CreateForms/CreateMachineForm.jsx';


import './AdminDashboard.css';
import axios from "axios";


function DashboardMachines() {

    const [isCreateMachineFormOpen, setCreateMachineFormOpen] = useState(false);


    const handleCreateMachineClick = () => {
        setCreateMachineFormOpen(true);
    };
    const token =
        localStorage.getItem('usertoken');    const headers = {
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

    const handleDelete = (machineId) => {
        // Replace with your API endpoint
        axios
            .delete(`http://localhost:5000/dashboard/admin/delete-machine/${machineId}`, { headers })
            .then((response) => {
                setData(data.filter((machine) => machine.machineId !== machineId));
            })
            .catch((error) => {
                console.error('Error deleting reservation: ', error);
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



                </div>
            </div>
            {/* /#sidebar-wrapper */}
            {/* Page Content */}
            <div id="page-content-wrapper">
                <div className="container-fluid px-4">
                    <div className="row my-5">
                        <h3 className="fs-4 mb-3">Machines</h3>
                        <div className="col">
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreateMachineClick}>
                                    Create Machine
                                </button>
                            </div>
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

                                            <button
                                                className="btn btn-sm btn-outline-danger me-2"
                                                onClick={() => handleDelete(machine.machineId)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <Modal
                isOpen={isCreateMachineFormOpen}
                onRequestClose={() => setCreateMachineFormOpen(false)}
                contentLabel="Create Machine Modal"
                ariaHideApp={false}
            >
                <CreateMachineForm />
            </Modal>
        </div>
    );
}

export default DashboardMachines;
