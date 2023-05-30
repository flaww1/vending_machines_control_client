import React from 'react';
import { Link } from 'react-router-dom';

function homePage() {
    return (
        <div className="home-wrapper d-flex align-items-center justify-content-center">
            <div className="card-deck">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Products</h5>
                        <p className="card-text">Browse our available products.</p>
                        <Link to="/products" className="btn btn-primary">Go to Products</Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Machines</h5>
                        <p className="card-text">Explore our vending machines.</p>
                        <Link to="/machines" className="btn btn-primary">Go to Machines</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default homePage;
