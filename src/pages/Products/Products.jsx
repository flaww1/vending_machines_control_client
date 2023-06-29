import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

function ProductList() {

    const token =localStorage.getItem('usertoken');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/store/products', { headers })
            .then((response) => response.json())
            .then((jsonResponse) => setData(jsonResponse.products));
    }, []);


    return (
        <div className="container">

            <div className="d-flex flex-wrap justify-content-around">
                {data.map(product => (
                    <div className="p-2" key={product.productId}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
