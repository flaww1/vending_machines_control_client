import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; // Update the import statement
import ReservationForm from '../../components/ReservationForm/ReservationForm.jsx';
function ProductDetails() {
    const { productId } = useParams();

    const token = localStorage.getItem('usertoken');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };

    const [data, setData] = useState({});
    const [showReservationForm, setShowReservationForm] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [selectedShelf, setSelectedShelf] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/store/products/${productId}`, { headers })
            .then((response) => response.json())
            .then((jsonResponse) => setData(jsonResponse.products));
    }, []);

    const handleReserveButtonClick = (machineId, shelfId) => {
        setShowReservationForm(true);
        setSelectedMachine(machineId);
        setSelectedShelf(shelfId);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    <h1 className="my-4">{data.name}</h1>
                    <p className="mb-4">{data.description}</p>
                    <h2 className="mb-4">${data.price}</h2>
                    <p className="mb-4">
                        <strong>Type:</strong> {data.type}
                    </p>
                    <button className="btn btn-primary btn-lg" onClick={() => setShowReservationForm(true)}>
                        Reserve
                    </button>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-lg-12">
                    <h2>Machine Details</h2>
                </div>
                {data.Product_Shelf &&
                    data.Product_Shelf.map((productShelf) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={productShelf.shelfId}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h4 className="card-title">Machine ID: {productShelf.shelf.Machine.machineId}</h4>
                                    <h5>Shelf ID: {productShelf.shelfId}</h5>
                                    <p className="card-text">
                                        <strong>Quantity:</strong> {productShelf.quantity_inSlot}<br />
                                        <strong>Location:</strong> {productShelf.shelf.Machine.location}<br />
                                        <strong>Status:</strong> {productShelf.shelf.Machine.status}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleReserveButtonClick(productShelf.shelf.Machine.machineId, productShelf.shelfId)}
                                    >
                                        Reserve From Machine
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <Modal isOpen={showReservationForm} onRequestClose={() => setShowReservationForm(false)}>
                <ReservationForm
                    productId={productId}
                    selectedMachine={selectedMachine}
                    selectedShelf={selectedShelf}
                    onClose={() => setShowReservationForm(false)}
                />
            </Modal>
        </div>
    );
}

export default ProductDetails;
