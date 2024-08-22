import React, { useState } from 'react';
import axios from 'axios';
import './AddBus.css';

interface AddBusModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddBusModal: React.FC<AddBusModalProps> = ({ isOpen, onClose }) => {
    const [furnitureBrand, setBusBrand] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('furnitureBrand', furnitureBrand);
       
        formData.append('price', price);
        if (image) {
            formData.append('furnitureImage', image);
        }

        try {
            const response = await axios.post('http://localhost:8080/furnitures/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            setShowPopup(true); // Show success popup
            setTimeout(() => {
                setShowPopup(false);
                onClose(); // Close the modal after hiding the popup
            }, 2000); // Hide popup after 3 seconds
        } catch (error) {
            console.error('Error adding furniture:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Add New Bus</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="furnitureBrand">Bus Brand:</label>
                        <input
                            type="text"
                            id="furnitureBrand"
                            value={furnitureBrand}
                            onChange={(e) => setBusBrand(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="text"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Bus Image:</label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Bus</button>
                </form>
            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>Bus added successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBusModal;
