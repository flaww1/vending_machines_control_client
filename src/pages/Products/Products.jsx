import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';

const ProductList = () => {
    // Sample product data
    const products = [
        { productId: 1, name: 'Product 1', price: 10.99 },
        { productId: 2, name: 'Product 2', price: 15.99 },
        { productId: 3, name: 'Product 3', price: 12.99 },
    ];

    return (
        <div className="container">
            <h1>Products</h1>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4" key={product.productId}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
