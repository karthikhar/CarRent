import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRents = () => {
  const [rentedCars, setRentedCars] = useState([]);

  useEffect(() => {
    const fetchRentedCars = async () => {
      try {
        const response = await axios.get('/api/rented-cars'); 
        setRentedCars(response.data);
      } catch (error) {
        console.error('Error fetching rented cars:', error);
      }
    };

    fetchRentedCars();
  }, []);

  return (
    <div>
      <h1>My Rented Cars</h1>
      {rentedCars.length === 0 && <p>No cars rented</p>}
      {rentedCars.map((car) => (
        <RentedCarDetails key={car._id} car={car} />
      ))}
    </div>
  );
};

export default MyRents;
