import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, FormGroup, Button, Container, Row, Col } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";

const Rent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    Days: "",
    numberOfPersons: "",
    numberOfLuggage: "",
  });

  const { slug } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const singleCarItem = data ? data.find((item) => item._id === slug) : null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
  
    if (name === 'phoneNumber') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }
  
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  
  useEffect(() => {
    axios.get("http://localhost:3000/data")
      .then((result) => {
        if (result.data.length > 0) {
          setData(result.data);
        } else {
          setIsDataEmpty(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    }
    if (!formData.Days || formData.Days <= 0) {
      newErrors.Days = "No.Of Days is required";
    }
    if (Object.keys(newErrors).length === 0) {
      setIsFormValid(true);
      setErrors({});
      setErrorMessage("");
      console.log("Form is valid:", formData);
      try {
        const orderUrl = "http://localhost:3000/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: singleCarItem.pricePerDay * formData.Days });

        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsFormValid(false);
      setErrors(newErrors);
      setErrorMessage("Please fill in all the required fields in the booking form.");
    }
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_9pgQrUxQqTn7SU",
      amount: singleCarItem.pricePerDay * 100,
      currency: data.currency,
      name: `${formData.firstName} ${formData.lastName}`,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        const verificationData = {
          ...response,
          order_id: data.id,
          amount: singleCarItem.pricePerDay * formData.Days,
          currency: data.currency,
          firstName: formData.firstName,
          email: formData.email,
          phoneNumber: formData.phoneNumber
        };

        axios.post('http://localhost:3000/api/payment/verify', verificationData)
          .then(() => {
            navigate('/home/:email');
          })
          .catch(error => {
            setGeneralError('Admin Not Found');
            console.error('Error:', error);
          });
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="text-center">
      <Container>
        <Row>
          <Col lg="7" className="mt-5 mx-auto w-75">
            <Form onSubmit={handleSubmit}>
              <FormGroup className="booking__form mb-4 w-75 mx-auto">
                <Row>
                  <Col md="6">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                  </Col>
                  <Col md="6">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="booking__form mb-4 w-75 mx-auto">
                <Row>
                  <Col md="6">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-black form-control"
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </Col>
                  <Col md="6">
                    <input
                      type="number"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="text-black form-control"
                    />
                    {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="booking__form mb-4 w-75 mx-auto">
                <Row>
                  <Col md="6">
                    <input
                      type="number"
                      name="Days"
                      placeholder="No. Of Days"
                      value={formData.Days}
                      onChange={handleChange}
                      className="text-black form-control"
                    />
                    {errors.Days && <div className="error-message">{errors.Days}</div>}
                  </Col>
                </Row>
              </FormGroup>

              <button type="submit" className="btn btn-primary">Rent</button>
            </Form>
          </Col>
            
        </Row>
        <div className="payment text-end mt-5">
              {errorMessage && <div className="error-message text-center text-danger">{errorMessage}</div>}
              {isDataEmpty && <div>No data available</div>}
            </div>
      </Container>
    </div>
  );
};

export default Rent;
