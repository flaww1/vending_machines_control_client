import React, { Component } from 'react';
import axios from 'axios';
import './ReservationForm.css';

const getPaymentTypes = () => {
    // Retrieve the enum values from the server or define them manually
    return ['APP', 'MACHINE'];
};
class ReservationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            paymentMethod: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const { productId } = this.props; // Retrieve the product ID from the props



        const newReservation = {

            machineId: this.props.selectedMachine,
            shelfId: this.props.selectedShelf,
            quantity: this.state.quantity,
            paymentMethod: this.state.paymentMethod,
        };

        const token = localStorage.getItem('usertoken');

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        };

        axios
            .post(`http://localhost:5000/reservations/make-reservation/${productId}`, newReservation, { headers })
            .then((response) => {
                console.log('Reservation Created');
                console.log(response.data);
                this.props.history.push('/products');
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    this.setState({ errors: {} });
                } else {
                    console.error('An error occurred:', error);
                }
            });
    }

    onClose() {
        // Clear the form fields and close the modal
        this.setState({
            quantity: '',
            paymentMethod: '',
        });
        this.props.onClose(); // Call the onClose prop passed from the parent to close the modal
    }

    render() {
        const { errors } = this.state;
        const { selectedMachine, selectedShelf } = this.props;

        return (
            <div className={`reservation-form ${!!selectedMachine && !!selectedShelf ? 'show' : 'hide'}`}>
                <div className="reservation-form-header">
                    <h2>Reservation Form<p> </p>
                       </h2>
                    <p> Shelf Number: {selectedShelf}</p>
                    <p>Machine ID: {selectedMachine}</p>
                </div>
                <div className="reservation-form-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={this.state.quantity}
                                onChange={this.onChange}
                                className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paymentMethod" className="form-label">
                                Payment Method
                            </label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={this.state.paymentMethod}
                                onChange={this.onChange}
                                className={`form-control ${errors.paymentMethod ? 'is-invalid' : ''}`}
                                required
                            >
                                <option value="">Select Type</option>
                                {getPaymentTypes().map((paymentMethod) => (
                                    <option key={paymentMethod} value={paymentMethod}>{paymentMethod}</option>
                                ))}
                            </select>
                            {errors.paymentMethod && <div className="invalid-feedback">{errors.paymentMethod}</div>}
                        </div>
                        <button className="btn btn-primary" type="submit">
                            Reserve
                        </button>
                        <button className="btn btn-secondary" type="button" onClick={this.onClose}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ReservationForm;
