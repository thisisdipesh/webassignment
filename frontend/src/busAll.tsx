import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BusCard from './busCard';
import './BusAll.css';

interface Bus {
    id: number;
    BusBrand: string;
    seat: number;
    price: string;
    BusImage: string;
    isBooked: boolean;
    rentalEndDateTime: string;
}

const BusAll: React.FC = () => {
    const [Buss, setBuss] = useState<Bus[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBuss = async () => {
            try {
                const response = await axios.get('http://localhost:8080/Buss/addlist');
                setBuss(response.data);
                setError(null); // Clear any previous error
            } catch (error) {
                console.error('Error fetching Buss:', error);
                setError('Failed to fetch Bus data. Please try again later.');
            }
        };

        fetchBuss();
    }, []);

    const handleBook = (BusId: number) => {
        console.log(`Bus ${BusId} booked`);
    };

    return (
        <div className="Bus-all-container">
            <h1>Buss Available in Kathmandu</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="Bus-list">
                {Buss.length > 0 ? (
                    Buss.map((Bus) => (
                        <BusCard key={Bus.id} bus={Bus} onBook={handleBook} />
                    ))
                ) : (
                    <p>No Buss available</p>
                )}
            </div>
        </div>
    );
};

export default BusAll;
