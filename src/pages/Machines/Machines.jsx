import React from 'react';
import { Link } from 'react-router-dom';
import MachineCard from "../../components/MachineCard/MachineCard.jsx";

const MachinesPage = () => {
    // Sample machine data
    const machines = [
        { id: 1, name: 'Machine 1', location: 'Location 1' },
        { id: 2, name: 'Machine 2', location: 'Location 2' },
        { id: 3, name: 'Machine 3', location: 'Location 3' },
    ];

    return (
        <div className="container">
            <h1>Machines</h1>
            <div className="row">
                {machines.map((machine) => (
                    <div className="col-md-4" key={machine.machineId}>
                        <MachineCard machine={machine} />
                    </div>
                ))}
            </div>
        </div>

    );
};

export default MachinesPage;
