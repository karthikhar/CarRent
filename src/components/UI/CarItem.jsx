import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useNavigate } from "react-router-dom";

const CarItem = (props) => {
  const navigate = useNavigate()
  const { carImagePath, model, carName, transmissionType, kilometerPerLitre, pricePerDay,_id } = props.item;
  const isRented = localStorage.getItem("Rented");


  return (
    <Col lg="4" md="4" sm="6" className="mb-5 h-45">
      <div className="car__item">
        <div className="car__img">
          <img src={carImagePath} alt="" className="w-100 h-50" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
          {pricePerDay}<span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {transmissionType}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {kilometerPerLitre}
            </span>
          </div>
           <p className="text-center">
          
           <Link to={`/rent/${_id}`} className="btn btn-primary w-25 me-1">Rent</Link>
         

         
            <Link to={`/cars/${_id}`} className="btn btn-warning w-25">Details</Link>
            </p>

        </div>
      </div>
    </Col>
  );
};

export default CarItem;
