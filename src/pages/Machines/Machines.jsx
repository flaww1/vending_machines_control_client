import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MachineCard from '../../components/MachineCard/MachineCard';

const MachineList = () => {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        // Fetch machines from the server
        axios
            .get('http://localhost:5000/store/machines/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('usertoken')}`,
                },
            })
            .then(response => {
                setMachines(response.data);
            })
            .catch(error => {
                console.error('Error fetching machines:', error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Machines</h1>
            <div className="row">
                {machines.map(machine => (
                    <div className="col-md-4" key={machine.machineId}>
                        <MachineCard machine={machine} />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default MachineList;
