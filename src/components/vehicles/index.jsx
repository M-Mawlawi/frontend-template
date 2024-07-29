import React, { useEffect, useState } from 'react';
import apiService from '../../services/api';

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [sortOption, setSortOption] = useState('type');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const authToken = localStorage.getItem("token");
                const res = await apiService.getVehicles(authToken);
                setVehicles(res.vehicles);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        fetchVehicles();
    }, []);

    const sortVehicles = (vehicles, option) => {
        return [...vehicles].sort((a, b) => {
            if (a[option] < b[option]) return -1;
            if (a[option] > b[option]) return 1;
            return 0;
        });
    };

    const filterVehicles = (vehicles, term) => {
        return vehicles.filter(vehicle =>
            vehicle.type.toLowerCase().includes(term.toLowerCase()) ||
            vehicle.licensePlate.toLowerCase().includes(term.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(term.toLowerCase())
        );
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const sortedVehicles = sortVehicles(vehicles, sortOption);
    const filteredAndSortedVehicles = filterVehicles(sortedVehicles, searchTerm);

    return (
        <div className="p-4 w-full mx-auto overflow-y-auto">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-black">Vehicles</h1>
                <div className="flex justify-center gap-20">
                    <div className="mb-4">
                        <label htmlFor="search" className="mr-2 text-black">Search:</label>
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="p-2 border border-black bg-black text-white rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sortOptions" className="mr-2 text-black">Sort by:</label>
                        <select
                            id="sortOptions"
                            value={sortOption}
                            onChange={handleSortChange}
                            className="p-2 border border-black bg-black text-white rounded"
                        >
                            <option value="type">Type</option>
                            <option value="licensePlate">License Plate</option>
                            <option value="model">Model</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                {filteredAndSortedVehicles.length > 0 ? (
                    <ul className="grid grid-cols-3 gap-4">
                        {filteredAndSortedVehicles.map(vehicle => (
                            <li key={vehicle.id} className="bg-white shadow rounded-md p-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900"><strong>Type:</strong> {vehicle.type || "N/A"}</h3>
                                        <p className="text-sm text-gray-500"><strong>License Plate:</strong> {vehicle.licensePlate || "N/A"}</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm font-medium text-gray-500">Model: <span className="text-green-600">{vehicle.model || "N/A"}</span></p>
                                    </div>
                                </div>                            
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No vehicles found</p>
                )}
            </div>
        </div>
    );
}

export default Vehicles;
