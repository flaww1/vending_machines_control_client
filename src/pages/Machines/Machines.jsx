import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MachineCard from '../../components/MachineCard/MachineCard'
import './Machines.css';

function ProductList() {

    const token =localStorage.getItem('usertoken');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/store/machines', { headers })
            .then((response) => response.json())
            .then((jsonResponse) => setData(jsonResponse.machines));
    }, []);


    return (
        <div className="container">
            <h1>Machines</h1>
            <div className="d-flex flex-wrap justify-content-around">
                {data.map(machine => (
                    <div className="p-2" key={machine.machineId}>
                        <MachineCard product={machine} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
