import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import CreateProductForm from '../../components/CreateForms/CreateProductForm';
import Modal from 'react-modal';

function DashboardProducts() {
    const [isCreateProductFormOpen, setCreateProductFormOpen] = useState(false);

    const handleCreateProductClick = () => {
        setCreateProductFormOpen(true);
    };

    const token =localStorage.getItem('usertoken');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/dashboard/admin/products', { headers })
            .then((response) => response.json())
            .then((jsonResponse) => setData(jsonResponse.products));
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
            <div id="page-content-wrapper">
                <div className="container-fluid px-4">
                    <div className="row my-5">
                        <h3 className="fs-4 mb-3">Products</h3>
                        <div className="col">
                            <div className="text-end">
                                <button className="btn btn-primary" onClick={handleCreateProductClick}>
                                    Create Product
                                </button>
                            </div>
                            <table className="table bg-white rounded shadow-sm table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((product) => {
                                    return (
                                        <tr key={product.productId}>
                                            <th scope="row">{product.productId}</th>
                                            <td>{product.name}</td>
                                            <td>{product.type}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary me-2">
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isCreateProductFormOpen}
                onRequestClose={() => setCreateProductFormOpen(false)}
                contentLabel="Create Product"
                ariaHideApp={false}
            >
                <CreateProductForm />
            </Modal>
        </div>
    );
}

export default DashboardProducts;
