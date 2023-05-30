import React from 'react';
import { Link } from 'react-router-dom';

const ProductPage = () => {
    // Sample product data
    const product = {
        id: 1,
        name: 'Product 1',
        price: 10.99,
    };

    const handleReserve = () => {
        // Logic for reserving the product
        console.log('Product reserved!');
    };

    return (
        <div className="container">
            <h1>Product Details</h1>
            <div className="product">
                <h2>{product.name}</h2>
                <p>Price: ${product.price}</p>
                <button onClick={handleReserve}>Reserve</button>
                <Link to="/products">Back to Products</Link>
            </div>
        </div>
    );
};

export default ProductPage;
