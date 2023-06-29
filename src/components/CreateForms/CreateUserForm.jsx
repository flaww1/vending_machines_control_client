import React, {Component} from "react";
import axios from "axios";
const getUserTypes = () => {
    // Retrieve the enum values from the server or define them manually
    return ['USER', 'ADMINISTRATOR', 'PROVIDER'];
};

class CreateUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            type: '', // Set the default value for the "type" field
            errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            type: this.state.type,
        };

        axios
            .post('http://localhost:5000/auth/register', newUser)
            .then((response) => {
                console.log('Registered');
                console.log(response.data);

                this.props.history.push('/dashboard');
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    this.setState({ errors: { image_uri: error.response.data.message, price: error.response.data.message } });
                } else {
                    console.error('An error occurred:', error);
                }
            });
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Create User</h1>
                            <div className="form-group">
                                <label htmlFor="name">First name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                    name="first_name"
                                    placeholder="Enter your first name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                />
                                {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Last name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                    name="last_name"
                                    placeholder="Enter your lastname name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                />
                                {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="type" className="form-label">User Type:</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={this.state.type}
                                    onChange={this.onChange}
                                    className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    {getUserTypes().map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Register!
                            </button>
                            <button type="button" onClick={this.onClose} className="btn btn-secondary">Close</button>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUserForm;
