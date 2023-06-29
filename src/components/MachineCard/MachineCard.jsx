import React from 'react';
import { Link } from 'react-router-dom';

function MachineCard({ machine }) {
    const { machineId, location, type } = machine;

    return (
        <div className="card border border-primary product-card">
            <div className="card-body">
                <h5 className="card-title">{type}</h5>
                <p className="card-text">Location: {location}</p>
                <Link to={`/machine/${machineId}`} className="btn btn-primary">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default MachineCard;
