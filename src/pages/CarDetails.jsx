import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const singleCarItem = data ? data.find((item) => item._id === slug) : null;
  

  
   useEffect(() => {
    axios.get('http://localhost:3000/data')
      .then((result) => {
        if (result.data.length > 0) {
          setData(result.data);
        }
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Helmet title={singleCarItem ? singleCarItem.carName : "Car Details"}>
      <section>
        <Container>
          <Row>
            {singleCarItem.carImagePath && (
              <>
                <Col lg="6" >
                <img src={`${process.env.PUBLIC_URL}/${singleCarItem.carImagePath}`}className="w-75" alt={singleCarItem.carName} />

                </Col>

                <Col lg="6">
                  <div className="car__info">
                    <h2 className="section__title">{singleCarItem.carName}</h2>

                    <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                      <h6 className="rent__price fw-bold fs-4">
                        {singleCarItem.pricePerDay} / Day
                      </h6>

                    </div>

                    <p className="section__description">
                      {singleCarItem.description}
                    </p>

                    <div
                      className=" d-flex align-items-center mt-3"
                      style={{ columnGap: "4rem" }}
                    >
                      <span className=" d-flex align-items-center gap-1 section__description">
                        <i
                          className="ri-roadster-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {singleCarItem.model}
                      </span>

                      <span className=" d-flex align-items-center gap-1 section__description">
                        <i
                          className="ri-settings-2-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {singleCarItem.transmissionType}
                      </span>

                      <span className=" d-flex align-items-center gap-1 section__description">
                        <i
                          className="ri-timer-flash-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {singleCarItem.kilometerPerLitre}
                      </span>
                    </div>

                    <div
                      className=" d-flex align-items-center mt-3"
                      style={{ columnGap: "2.8rem" }}
                    >
                      <span className=" d-flex align-items-center gap-1 section__description">
                        <i
                          className="ri-map-pin-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {singleCarItem.gps}
                      </span>

                      
                      <span className=" d-flex align-items-center gap-1 section__description">
                        <i
                          className="ri-building-2-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {singleCarItem.brand}
                      </span>
                    </div>
                  </div>
                </Col>
              </>
            )}

          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
