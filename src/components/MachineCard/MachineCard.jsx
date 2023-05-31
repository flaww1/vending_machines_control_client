import React from 'react';
import { Link } from 'react-router-dom';

const MachineCard = ({ machine }) => {
    const { id, name, location } = machine;

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Location: {location}</p>
                <Link to={`/machine/${id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    );
};

export default MachineCard;
