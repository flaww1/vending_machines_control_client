import React, {Component} from 'react';
import axios from 'axios';

const getProductTypes = () => {
    // Retrieve the enum values from the server or define them manually
    return ['COLD_DRINK', 'HEATED_DRINK', 'SNACK', 'OTHER'];
};
class EditProductForm extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            image_uri: '',
            description: '',
            type: '',
            price: 0,
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);

    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const { editProductId } = this.props; // Retrieve the product ID from the props

        const editProduct = {
            name: this.state.name,
            image_uri: this.state.image_uri,
            description: this.state.description,
            type: this.state.type,
            price: this.state.price
        };

        const token = localStorage.getItem('usertoken');

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        };


        axios
            .put(`http://localhost:5000/dashboard/admin/update-product/${editProductId}`, editProduct, { headers })
            .then((response) => {
                console.log('Product Edited');
                console.log(response.data);
                this.props.history.push('/dashboard');
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    this.setState({ errors: { email: error.response.data.message } });
                } else {
                    console.error('An error occurred:', error);
                }
            });
    }
    onClose() {
        // Clear the form fields and close the modal
        this.setState({
            name: '',
            image_uri: '',
            description: '',
            type: '',
            price: 0,
        });
        this.props.onClose(); // Call the onClose prop passed from the parent to close the modal
    }

    render() {
        const {errors} = this.state;
        const { editProductId} = this.props;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3>Edit Product</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="image_uri" className="form-label">Image URL:</label>
                            <input
                                type="text"
                                id="image_uri"
                                name="image_uri"
                                value={this.state.image_uri}
                                onChange={this.onChange}
                                className={`form-control ${errors.image_uri ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.image_uri && <div className="invalid-feedback">{errors.image_uri}</div>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">Type:</label>
                            <select
                                id="type"
                                name="type"
                                value={this.state.type}
                                onChange={this.onChange}
                                className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                                required
                            >
                                <option value="">Select Type</option>
                                {getProductTypes().map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            {errors.type && <div className="invalid-feedback">{errors.type}</div>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={this.state.price}
                                onChange={this.onChange}
                                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.price && <div className="invalid-feedback">{errors.price}</div>}

                        </div>
                        <button type="submit" className="btn btn-primary">Edit Product</button>
                        <button type="button" onClick={this.onClose} className="btn btn-secondary">Close</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default EditProductForm;
