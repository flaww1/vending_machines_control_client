import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserReservations() {

    const token =localStorage.getItem('usertoken');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    const [reservations, setReservations] = useState([]);

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
        axios.post(`http://localhost:5000/reservations/cancel/${reservationId}`, { headers })
            .then((response) => {
                setReservations(reservations.filter(reservation => reservation.reservationId !== reservationId));
            })
            .catch((error) => {
                console.error('Error cancelling reservation: ', error);
            });
    };

    return (
        <div>
            <h1>Your Reservations</h1>
            {reservations.map((reservation) => (
                <div key={reservation.id}>
                    <p>Reservation ID: {reservation.id}</p>
                    <p>Product ID: {reservation.productId}</p>
                    {/* Other details... */}
                    <button onClick={() => handleCancelReservation(reservation.id)}>Cancel Reservation</button>
                </div>
            ))}
        </div>
    );
}

export default UserReservations;
