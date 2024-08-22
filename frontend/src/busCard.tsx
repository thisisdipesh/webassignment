import React from 'react';
import './busCard.css'; // Ensure you create and style this CSS file accordingly

interface busCardProps {
    bus: {
        id: number;
        busBrand: string;
        seat: number;
        price: string;
        busImage: string;
        isBooked: boolean;
        rentalEndDateTime: string;
    };
    onBook: (busId: number) => void; // Ensure this is typed correctly
}

const busCard: React.FC<busCardProps> = ({ bus, onBook }) => {
    return (
        <div className="bus-Card">
            <img src={bus.busImage} alt={`${bus.busBrand} image`} className="bus-image" />
            <h2>{bus.busBrand}</h2>
            
            <p>Price: {bus.price}</p>
            <p>Status: {bus.isBooked ? 'Booked' : 'Available'}</p>
            <p>Rental End: {bus.rentalEndDateTime}</p>
            <button onClick={() => onBook(bus.id)} disabled={bus.isBooked}>
                {bus.isBooked ? 'Booked' : 'Book Now'}
            </button>
        </div>
    );
};

export default busCard;
