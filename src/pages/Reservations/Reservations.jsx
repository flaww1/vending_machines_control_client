import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from "react-modal";
import PaymentForm from "../../components/PaymentForm/PaymentForm.jsx";
import {useParams} from "react-router-dom";

function UserReservations() {
    const { reservationCode } = useParams();

    const token =localStorage.getItem('usertoken');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    const [reservations, setReservations] = useState([]);


    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);


    useEffect(() => {
        // Replace with your API endpoint
        axios.get('http://localhost:5000/reservations/', { headers })
            .then((response) => {
                setReservations(response.data.reservations);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            })
    }, []);

    const handleCancelReservation = (reservationId) => {
        // Replace with your API endpoint
        axios.put(`http://localhost:5000/reservations/cancel/${reservationId}`, {}, { headers })
            .then((response) => {
                setReservations(reservations.filter(reservation => reservation.reservationId !== reservationId));
            })
            .catch((error) => {
                console.error('Error cancelling reservation: ', error);
            });
    };


    const handlePaymentButtonClick = (reservationId) => {
        setShowPaymentForm(true);
        setSelectedReservation(reservationId);

    };

    return (
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
                            {reservations.map((reservation) => (
                                <tr key={reservation.reservationId}>
                                    <td>{reservation.reservationId}</td>
                                    <td>{reservation.status}</td>
                                    <td>{reservation.total_price}</td>
                                    <td>{reservation.quantity}</td>

                                    <td>
                                        <button
                                            style={{backgroundColor: '#ff7f7f', color: 'black'}}
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleCancelReservation(reservation.reservationId)}
                                        >
                                            Cancel Reservation
                                        </button>
                                        <button
                                            style={{backgroundColor: '#90ee90', color: 'black'}}

                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handlePaymentButtonClick(reservation.reservationId)}
                                        >
                                            Pay
                                        </button>
                                        <button
                                            style={{backgroundColor: '#add8e6', color: 'black'}}
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => alert(`Reservation Code: ${reservation.reservationCode}`)}
                                        >
                                            Show Reservation Code
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal isOpen={showPaymentForm} onRequestClose={() => setShowPaymentForm(false)}>
                <PaymentForm
                    selectedReservation={selectedReservation}
                    price={selectedReservation ? reservations.find(reservation => reservation.reservationId === selectedReservation).total_price : 0}
                    reservationCode={selectedReservation ? reservations.find(reservation => reservation.reservationId === selectedReservation).reservationCode : 0}
                    onClose={() => setShowPaymentForm(false)}
                />
            </Modal>
        </div>
    );
}

export default UserReservations;

