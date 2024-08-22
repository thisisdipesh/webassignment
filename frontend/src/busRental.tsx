import React from 'react';
import './busRental.css';
import {Link} from "react-router-dom";
import sofa from "./assets/sofa.png";
import loaction from "./assets/location.png";
import user from "./assets/user.jpg";
const busRental: React.FC = () => {
    return (
        <div className="bus-body">
            <header className="bus-header">
                <h1>Rent bus</h1>
                <div className="bus-filters">
                    <div className="bus-dropdown">
                        <label htmlFor="bus-type">bus Type</label>
                        <select id="bus-type">
                            <option value="all">All</option>
                            <option value="bus">bus</option>
                        </select>
                    </div>
                    <div className="bus-dropdown">
                        <label htmlFor="vehicle-brand">Brand</label>
                        <select id="vehicle-brand">
                            <option value="all">All</option>
                            <option value="SOFA">Sofa</option>
                            <option value="STUDYTABLE">StudyTable</option>
                            <option value="Beanbag">Beanbag</option>
                            <option value="Chair">Chair</option>
                            <option value="Swing">Swing</option>
                            <option value="BookSelf">BookSelf</option>
                            <option value="Bed">Bed</option>
                        </select>
                    </div>
                    <div className="bus-dropdown">
                        <label htmlFor="price-filter">Price</label>
                        <select id="price-filter">
                            <option value="100-300">$100-$300</option>
                            <option value="301-500">$301-$500</option>
                            <option value="501-800">$501-$800</option>
                            <option value="801-1000">$801-$1000</option>
                        </select>
                    </div>
                </div>
            </header>
            <div className="bus-vehicle-grid">
                {Array.from({ length: 14 }, (_, index) => (
                    <div className="bus-card" key={index}>
                        <p>{getbusName(index)}</p>
                        <div className="bus-image-container">
                            <img src={sofa} alt={`bus ${index + 1}`} />
                        </div>
                        <div className="bus-info-container">
                            <div className="bus-location">
                                <img src={loaction} alt="Location Icon" />
                                <span>Kathmandu</span>
                            </div>
                            <div className="bus-seats">
                                <img src={user} alt="User Icon" />
                                <span>4 Seats</span>
                            </div>
                            <div className="bus-price-section">
                                <div className="bus-price">
                                    <span className="bus-estimate">Estimated Price</span>
                                    <span className="bus-amount">{getbusPrice(index)}/day</span>
                                </div>
                                <div className="bus-book-button">
                                    <Link to='/busbooking'><button>Book</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const getbusName = (index: number) => {
    const names = ['Sofa', 'Sofa', 'Study Table', 'Study Table ', 'BeanBag', 'BeanBag', 'Chair', 'Chair', 'Swing', 'Swing', 'BookSelf', 'Bookself', 'Bed', 'Bed'];
    return names[index];
};
const getbusPrice = (index: number) => {
    const prices = ['$950', '$950', '$900', '$900', '$650', '$650', '$780', '$780', '$350', '$350', '$250', '$250', '$200', '$200'];
    return prices[index];
};

export default busRental;
