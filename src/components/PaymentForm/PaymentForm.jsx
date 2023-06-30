import React, { Component } from 'react';
import axios from 'axios';
import './paymentForm.css';
class PaymentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentAmount: '',
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

        const { reservationCode } = this.props;



        const newPayment = {
            reservationId : this.props.selectedReservation,
            paymentAmount : this.state.paymentAmount,
        };
        const token = localStorage.getItem('usertoken');

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        };

        axios
            .post(`http://localhost:5000/reservations/payment/${reservationCode}`, newPayment, { headers })
            .then((response) => {
                console.log('Payment Created');
                console.log(response.data);
                history.push('/reservations');
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    this.setState({ errors: { paymentAmount: error.response.data.message } });
                } else {
                    console.error('An error occurred:', error);
                }
            });
    }

    onClose() {
        // Clear the form fields and close the modal
        this.setState({
            paymentAmount: '',

        });
        this.props.onClose(); // Call the onClose prop passed from the parent to close the modal
    }

    render() {
        const { errors } = this.state;
        const { selectedReservation, price} = this.props;

        return (
            <div className={`payment-form ${selectedReservation ? 'show' : 'hide'}`}>
                <div className="payment-form-header">
                    <h2>Payment Form<p> </p>
                    </h2>
                    <p>Reservation ID: {selectedReservation}</p>
                    <p>Total Price: {price}</p> {/* Display the total price */}                </div>
                <div className="payment-form-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">
                                Payment Amount
                            </label>
                            <input
                                type="number"
                                id="paymentAmount"
                                name="paymentAmount"
                                value={this.state.paymentAmount}
                                onChange={this.onChange}
                                className={`form-control ${errors.paymentAmount ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.paymentAmount && <div className="invalid-feedback">{errors.paymentAmount}</div>}
                        </div>
                        <button className="btn btn-primary" type="submit">
                            Pay
                        </button>
                        <button className="btn btn-secondary" type="button" onClick={this.onClose}>
                            Back
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default PaymentForm;
