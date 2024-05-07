import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm('service_af818ex', 'template_hbqu8lh', form.current, {



        
        publicKey: 'rheAtIgoVcF7cue_Y',
      })
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message Sent");
          e.target.reset();
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("An error occurred. Please try again later.");
        },
      );
  };
  
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>
              <StyledContactForm>
              <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
              </form>
              </StyledContactForm>
            </Col>
            

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  Banglore
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+91 7892225303</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">abinkumar063@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;


const StyledContactForm = styled.div`
width: 400px;

form{
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  font-size: 16px;

  input{
    width: 100%;
    height: 35px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
  

  &:focus{
    border: 2px solid rgba(0, 206, 158, 1);
  }
}

textarea{
  max-width: 100%;
  min-width: 100%;
  width: 100%;
  max-height: 100px;
  min-height: 100px;
  padding: 7px;
  outline: none;
  border-radius: 5px;
  border: 1px solid rgb(220, 220, 220);
  &:focus{
    border:2px solid rgba(0, 206, 158, 1);
  }
}

label{
  margin-top: 1rem;
}

input[type="submit"]{
  margin-top: 2rem;
  cursor: pointer;
  background: #000d6b;
  color: white;
  border: none;
}
}
`;