import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    const { productId, name, price} = product;

    return (
        <div className="card border border-primary product-card">
            <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <p className="card-text">${price}</p>
            <Link to={`/products/${productId}`} className="btn btn-primary">
                View Details
            </Link>
        </div>
        </div>
    );
}

export default ProductCard;
