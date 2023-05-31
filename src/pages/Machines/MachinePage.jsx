import React from 'react';

import './MachinePage.css'

const MachinePage = () => {
    // Example machine data
    const machine = {
        id: 1,
        name: 'Machine 1',
        location: 'Location 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        products: [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
            { id: 3, name: 'Product 3' },
        ],
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h1 className="mb-4">{machine.name}</h1>
                    <h3 className="mb-3">Location: {machine.location}</h3>
                    <p className="mb-4">{machine.description}</p>
                    <h4 className="mb-3">Products:</h4>
                    <ul className="list-unstyled">
                        {machine.products.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


export default MachinePage;
