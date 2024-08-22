import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BusList.css'; // Create and style this CSS file accordingly
import AddBusModal from './Addbus'; // Adjust the path according to your file structure
import EditBusModal from './Editbus'; // Adjust the path according to your file structure

interface Bus {
    id: number;
    furnitureBrand: string;
    seat: number;
    price: string;
    furnitureImage: string; // Base64 encoded image string
}

const BusList: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBusIndex, setSelectedBusIndex] = useState<number | null>(null);
    const [furnitures, setBuss] = useState<Bus[]>([]);

    useEffect(() => {
        const fetchBuss = async () => {
            try {
                const response = await axios.get('http://localhost:8080/furnitures/addlist');
                setBuss(response.data);
            } catch (error) {
                console.error('Error fetching furnitures:', error);
            }
        };

        fetchBuss();
    }, []);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const openEditModal = (index: number) => {
        setSelectedBusIndex(index);
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

  

    const handleDelete = async (index: number) => {
        const furnitureToDelete = furnitures[index];
        try {
            await axios.delete(`http://localhost:8080/furnitures/addlist/${furnitureToDelete.id}`);
            const updatedBuss = furnitures.filter((_, i) => i !== index);
            setBuss(updatedBuss);
        } catch (error) {
            console.error('Error deleting furniture:', error);
        }
    };

    return (
        <div className="furniture-list-container">
            <button className="add-furniture-button" onClick={openAddModal}>Add Bus</button>
            <table className="furniture-list-table">
                <thead>
                <tr>
                    <th>Bus ID</th>
                    <th>Bus Image</th>
                    <th>Bus Brand</th>
                    <th>Seat</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {furnitures.map((furniture, index) => (
                    <tr key={furniture.id}>
                        <td>{furniture.id}</td>
                        <td>
                            <img src={`data:image/jpeg;base64,${furniture.furnitureImage}`} alt={`Bus ${index}`} className="furniture-image" />
                        </td>
                        <td>{furniture.furnitureBrand}</td>
                        <td>{furniture.seat}</td>
                        <td>{furniture.price}</td>
                        <td>
                            <button className="action-button edit-button" onClick={() => openEditModal(index)}>Edit</button>
                            <button className="action-button delete-button" onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <AddBusModal isOpen={isAddModalOpen} onClose={closeAddModal} />
            {selectedBusIndex !== null && (
                <EditBusModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    furniture={furnitures[selectedBusIndex]} onSave={function (_updatedBus: { id: number; furnitureBrand: string; price: string; furnitureImage: string; }): void {
                        throw new Error('Function not implemented.');
                    } }                    
                />
            )}
        </div>
    );
};

export default BusList;