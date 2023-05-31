import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { id } = useParams();

    // Sample product data
    const product = {
        id: 1,
        name: 'Product 1',
        image: 'https://example.com/product1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'Type A',
        machine: 'Machine 1',
    };

    const handleReserveClick = () => {
        // Handle reserve button click event
    };

    return (
        <div className="container">
            <h1>{product.name}</h1>
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="col-md-6">
                    <h3>Description:</h3>
                    <p>{product.description}</p>
                    <h4>Type:</h4>
                    <p>{product.type}</p>
                    <h4>Machines:</h4>
                    <p>{product.machine}</p>
                    <button className="btn btn-primary" onClick={handleReserveClick}>Reserve</button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
