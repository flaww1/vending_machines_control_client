import React, { useState } from 'react';

import './CreateUserForm.css';
function CreateUserForm() {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY4NTM2NDA2MCwiZXhwIjoxNjg3OTU2MDYwfQ.zbDnYOWxvplEBP3redatqu1N7DtO3vpdhE8nFJF8B_w'
        // Send a POST request to your API endpoint to create the user
        fetch('http://localhost:5000/dashboard/admin/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('User created successfully', data);
                // Reset the form after successful user creation
                setUserData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                });
            })
            .catch(error => {
                console.error('Error occurred while creating user', error);
            });
    };

    return (
        <div>
            <h3>Create User</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default CreateUserForm;
