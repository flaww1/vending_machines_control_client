import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardUsers = () => {
    const token = localStorage.getItem('usertoken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        // Replace with your API endpoint
        axios
            .get('http://localhost:5000/reservations/', { headers })
            .then((response) => {
                setData(response.data.reservations);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    console.log('Data:', data);

    const handleDelete = (reservationId) => {
        // Replace with your API endpoint
        axios
            .delete(`http://localhost:5000/dashboard/admin/delete-reservation/${reservationId}`, { headers })
            .then((response) => {
                setData(data.filter((reservation) => reservation.reservationId !== reservationId));
            })
            .catch((error) => {
                console.error('Error deleting reservation: ', error);
            });
    };

    return (
        <div className="d-flex" id="wrapper">
            {/* Sidebar */}
            {/* ...sidebar code... */}
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
                                    <th scope="col">Status</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((reservation) => (
                                    <tr key={reservation.reservationId}>
                                        <td>{reservation.reservationId}</td>
                                        <td>{reservation.status}</td>
                                        <td>{reservation.total_price}</td>
                                        <td>{reservation.quantity}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-danger me-2"
                                                onClick={() => handleDelete(reservation.reservationId)}
                                            >
                                                Delete
                                            </button>
                                            <button className="btn btn-sm btn-outline-primary me-2">
                                                Edit
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
        </div>
    );
};

export default DashboardUsers;
