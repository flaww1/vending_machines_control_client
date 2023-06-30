import React, { Component } from 'react';
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000',
});

const login = (user) => {
    return api
        .post('/auth/login', {
            email: user.email,
            password: user.password,
        })
        .then((response) => {
            localStorage.setItem('usertoken', response.data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        // Check if the user is already logged in
        const token = localStorage.getItem('usertoken');
        if (token) {
            // Redirect to the home page or any other authorized route
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        login(user)
            .then((response) => {
                console.log('Logged in');
                this.props.onLogin(user.email); // Add this line

                // Redirect to the home page or any other authorized route
                this.props.history.push('/');
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.status === 401 &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    this.setState({ errors: { login: error.response.data.message } });
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
                            <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                            {errors.login && <div className="alert alert-danger">{errors.login}</div>}
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
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
