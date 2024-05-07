import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";

import axios from 'axios'

const CarListing = () => {

  const [data, setData] = useState([]);
  const [nulldata,setnulldata]=useState();
 const [sortOrder, setSortOrder] = useState("none");

 useEffect(() => {
  axios.get('http://localhost:3000/data')
    .then((result) => {
      if(result.data.length>0){
        setData(result.data);
      }
      else{
        setnulldata("Nodata")
      }
      
      console.log(result.data)
    })
    .catch((error) => {
      console.log(error);
    });
}, []);


const handleSortChange = (e) => {
  setSortOrder(e.target.value);
};

const sortedData = [...data].sort((a, b) => {
  if (sortOrder === 'low') {
    return a.pricePerDay - b.pricePerDay;
  } else if (sortOrder === 'high') {
    return b.pricePerDay - a.pricePerDay;
  } else {
    return 0;
  }
});

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row >
            <Col lg="12" >
              <div className=" d-flex align-items-center gap-3 mb-5 h-45 w-45">
                <span className=" d-flex align-items-center gap-2 h-45 w-45">
                  <i class="ri-sort-asc"></i> Sort By
                </span>

                <select value={sortOrder} onChange={handleSortChange}>
                  <option value="none">Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {sortedData && sortedData.map((item) => (
              <CarItem item={item} key={item._id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
