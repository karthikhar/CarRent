import React, { useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "../../styles/header.css";

const adminLoggedin = localStorage.getItem("adminloggedIn") === "true";

const navLinks = [
  {
    path: "/home/:email",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  ...(adminLoggedin
    ? [
        {
          path: "/carform",
          display: "Rent Car",
        },
        {
          path: "/report",
          display: "Reports",
        },
      ]
    : []),
].filter(Boolean);

const Header = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const isLoggedIn = localStorage.getItem("loggedIn");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/search?searchQuery=${searchQuery}`);
      setSearchResults(response.data.data);
      

      navigate("/searchdisplay", { state: { searchitem: response.data.data } });
      
    } catch (error) {
      console.error(error);
    }
};


  const makeLogout = () => {
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("adminloggedIn", false);
    window.location.reload();
  };

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +91-7892225303
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {adminLoggedin === false && isLoggedIn === "true" && (
                  <Link to="/profile" className="d-flex align-items-center gap-1">
                    <i className="ri-user-fill"></i>
                    <span>My Profile</span>
                  </Link>
                )}
                {isLoggedIn === "true" || adminLoggedin === true ? (
                  <>
                    <button className="d-flex align-items-center gap-1 btn btn-primary" onClick={makeLogout}>
                      <i className="ri-login-circle-line"></i> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="d-flex align-items-center gap-1">
                      <i className="ri-login-circle-line"></i> Login
                    </Link>
                    <Link to="/register" className="d-flex align-items-center gap-1">
                      <i className="ri-user-line"></i> Register
                    </Link>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>Rent Car <br /> Service</span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span><i className="ri-earth-line"></i></span>
                <div className="header__location-content">
                  <h4>Banglore</h4>
                  <h6>Silicon City, Banglore</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span><i className="ri-time-line"></i></span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col lg="2" md="3" sm="0" className="d-flex align-items-center justify-content-end">
              <button className="header__btn btn">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    activeClassName="nav__active"
                    className="nav__item"
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    required
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                <button className="border-0"style={{ backgroundColor: "#010A4F" }}>
                    <span><i className="ri-search-line"></i></span>
                </button>

                </form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
