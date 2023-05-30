import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ productId, title, description, image }) {
    return (
        <div className="product-card">
            <img src={image} alt="Product Image" className="product-image" />
            <h3 className="product-title">{title}</h3>
            <p className="product-description">{description}</p>
            <Link to={`/product/${productId}`} className="product-link">
                View Details
            </Link>
        </div>
    );
}

export default ProductCard;
