import React, { Component } from 'react';
import axios from 'axios';


const getMachineTypes = () => {
    // Retrieve the enum values from the server or define them manually
    return ['COLD_DRINKS', 'HEATED_DRINKS', 'SNACKS', 'OTHERS'];
};

const getMachineStatus = () => {
    // Retrieve the enum values from the server or define them manually
    return ['ACTIVE', 'INACTIVE', 'MAINTENANCE'];
}

const getMachineEnergyModes = () => {
    // Retrieve the enum values from the server or define them manually
    return ['ECO', 'NORMAL', 'MAX'];
}

const token = localStorage.getItem('usertoken');

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
};

class CreateMachineForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            machineModels: [],
            showModal: false,
            modelId: 0,
            type: '',
            status: '',
            energyMode: '',
            location: '',
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClose = this.onClose.bind(this);

    }

    componentDidMount() {
        // Fetch machine models from the server
        axios.get('http://localhost:5000/dashboard/admin/machine-models', { headers })
            .then(response => {
                // Update the machineModels state with the fetched data
                this.setState({ machineModels: response.data });
            })
            .catch(error => {
                console.error('Error fetching machine models:', error);
            });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();

        const newMachine = {
            modelId: this.state.modelId,
            type: this.state.type,
            status: this.state.status,
            energyMode: this.state.energyMode,
            location: this.state.location,
        };

        axios
            .post('http://localhost:5000/dashboard/admin/create-machine/', newMachine, { headers })
            .then((response) => {
                console.log('Machine Created');
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
            machineModels: [],
            showModal: false,
            modelId: 0,
            type: '',
            status: '',
            energyMode: '',
            location: '',
        });
        this.props.onClose(); // Call the onClose prop passed from the parent to close the modal
    }


    render() {
        const { errors } = this.state;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3>Create Machine</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="modelId" className="form-label">Model:</label>
                            <select
                                id="model"
                                name="modelId"
                                value={this.state.modelId}
                                onChange={this.onChange}
                                className={`form-control ${errors.modelId ? 'is-invalid' : ''}`}
                                required
                            >
                                <option value="">Select a machine model</option>
                                {this.state.machineModels.map((machine) => (
                                    <option key={machine.modelId} value={machine.modelId}>
                                        {machine.model}
                                    </option>
                                ))}
                            </select>
                            {errors.modelId && <div className="invalid-feedback">{errors.modelId}</div>}
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
                                {getMachineTypes().map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status:</label>
                            <select
                                id="status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                required
                            >
                                <option value="">Select Status</option>
                                {getMachineStatus().map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="energyMode" className="form-label">Energy Mode:</label>
                            <select
                                id="energyMode"
                                name="energyMode"
                                value={this.state.energyMode}
                                onChange={this.onChange}
                                className={`form-control ${errors.energyMode ? 'is-invalid' : ''}`}
                                required
                            >
                                <option value="">Select Energy Mode</option>
                                {getMachineEnergyModes().map((energyMode) => (
                                    <option key={energyMode} value={energyMode}>{energyMode}</option>
                                ))}
                            </select>
                            {errors.energyMode && <div className="invalid-feedback">{errors.energyMode}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location:</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Create Machine</button>


                        <button type="button" onClick={this.onClose} className="btn btn-secondary">Close</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateMachineForm;
