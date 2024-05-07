import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/rentals/report')
      .then(res => {
        setReportData(res.data);
      })
      .catch(err => {
        setError(err.message || 'An error occurred');
      });
  }, []);

  console.log(reportData);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Rental Report</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {error && <p className="text-center text-danger">{error}</p>}
          {reportData ? (
            <table className="table">
              <thead>
                <tr>
                  <th>User Information</th>
                  <th>Order Information</th>
                  <th>Rented Details</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((rental, index) => (
                  <tr key={index}>
                    <td>
                      <ul>
                        <li><strong>First Name:</strong> {rental.firstName}</li>
                        <li><strong>Email:</strong> {rental.email}</li>
                        <li><strong>Phone Number:</strong> {rental.phoneNumber}</li>
                      </ul>
                    </td>
                    <td>
                      <ul>
                        <li><strong>Order ID:</strong> {rental.order_id}</li>
                        <li><strong>Amount:</strong> {rental.amount}</li>
                      </ul>
                    </td>
                    <td>
                      {rental.rentedCars && (
                        <ul>
                          {rental.rentedCars.map((car, carIndex) => (
                            <li key={carIndex}>
                              <strong>Car Name:</strong> {car.carName}<br />
                              <strong>Rented Date:</strong> {car.rentedDate}<br />
                              <strong>Car Rented:</strong> {car.CarRented}<br />
                            </li>
                          ))}
                        </ul>
                      )}
                      {rental.rentedCars && (
                        <ul>
                          <li><strong>Total Cars Rented:</strong> {rental.rentedCars.reduce((acc, curr) => acc + curr.totalCarsRented, 0)}</li>
                          <li><strong>Total Amount Rented:</strong> {rental.rentedCars.reduce((acc, curr) => acc + curr.amountRented, 0)}</li>
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};  

export default Report;
