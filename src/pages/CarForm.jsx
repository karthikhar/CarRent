import React, { useState } from 'react';
import '../styles/carform.css';
import axios from 'axios';

const CarForm = () => {
  const [brand, setBrand] = useState('');
  const [carName, setCarName] = useState('');
  const [model, setModel] = useState('');
  const [kilometerPerLitre, setKilometerPerLitre] = useState('');
  const [gps, setGps] = useState(false);
  const [transmissionType, setTransmissionType] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [description, setDescription] = useState('');
  const [carImage, setCarImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!brand) {
      newErrors.brand = 'Brand is required';
    }
    if (!carName) {
      newErrors.carName = 'Car Name is required';
    }
    if (!model) {
      newErrors.model = 'Model is required';
    }
    if (!kilometerPerLitre) {
      newErrors.kilometerPerLitre = 'Kilometer Per Litre is required';
    }
    if (!transmissionType) {
      newErrors.transmissionType = 'Transmission Type is required';
    }
    if (!pricePerDay) {
      newErrors.pricePerDay = 'Price Per Day is required';
    } else if (pricePerDay < 0) {
      newErrors.pricePerDay = 'Price Per Day must be a positive number';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append('brand', brand);
        formData.append('carName', carName);
        formData.append('model', model);
        formData.append('kilometerPerLitre', kilometerPerLitre);
        formData.append('gps', gps);
        formData.append('transmissionType', transmissionType);
        formData.append('pricePerDay', pricePerDay);
        formData.append('description', description);
        formData.append('carImage', carImage); 

        await axios.post('http://localhost:3000/carform', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        

        alert('Form submitted successfully');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to submit form. Please try again.');
      }
    }
  };

  const handleFileChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-color-white'>
      <div className="car-form-container">
        <h2 className="text-center">Rent Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              className={`form-control ${errors.brand ? 'is-invalid' : ''}`}
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="carName">Car Name:</label>
            <input
              type="text"
              id="carName"
              className={`form-control ${errors.carName ? 'is-invalid' : ''}`}
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
            />
            {errors.carName && <div className="invalid-feedback">{errors.carName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              className={`form-control ${errors.model ? 'is-invalid' : ''}`}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            {errors.model && <div className="invalid-feedback">{errors.model}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="kilometersPerLitre">Kilometer Per Litre:</label>
            <input
              type="number"
              id="kilometerPerLitre"
              className={`form-control ${errors.kilometerPerLitre ? 'is-invalid' : ''}`}
              value={kilometerPerLitre}
              onChange={(e) => setKilometerPerLitre(e.target.value)}
            />
            {errors.kilometerPerLitre && <div className="invalid-feedback">{errors.kilometerPerLitre}</div>}
          </div>
          <div className="form-group">
            <label>
              GPS Navigation:
              <input
                type="checkbox"
                checked={gps}
                onChange={(e) => setGps(e.target.checked)}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Transmission Type:
              <select
                className={`form-control ${errors.transmissionType ? 'is-invalid' : ''}`}
                value={transmissionType}
                onChange={(e) => setTransmissionType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
              {errors.transmissionType && <div className="invalid-feedback">{errors.transmissionType}</div>}
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="pricePerDay">Price Per Day:</label>
            <input
              type="number"
              id="pricePerDay"
              className={`form-control ${errors.pricePerDay ? 'is-invalid' : ''}`}
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
            />
            {errors.pricePerDay && <div className="invalid-feedback">{errors.pricePerDay}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="carImage">Car Image:</label>
            <input
              type="file"
              id="carImage"
              className={`form-control ${errors.carImage ? 'is-invalid' : ''}`}
              onChange={handleFileChange}
            />
            {errors.carImage && <div className="invalid-feedback">{errors.carImage}</div>}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
