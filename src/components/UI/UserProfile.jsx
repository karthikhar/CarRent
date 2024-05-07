import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user_Id = localStorage.getItem("userId");
    if (!user_Id) {
      setError("User ID not provided");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:3000/api/profile/${user_Id}`)
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch user data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="container mt-5 d-flex justify-content-center mb-5">
      <div className="card p-3">
        <h2 className="card-title text-center">User Profile</h2>
        <div className="card-body text-justify">
          <p className="card-text">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="card-text">
            <strong>User ID:</strong> {user._id}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {user.email}
          </p>
          <p>
          <Link to={`/myrents`} className="btn btn-primary ">My Rents</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Profile;


const styles = `

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

.menu-trigger img {
  position: absolute;
  top: 20px;
  right: 20px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
}

.dropdown-menu {
  position: absolute;
  top: 100px;
  right: 20px;
  background-color: #fff;
  border-radius: var(--border-radius);
  padding: 10px 20px;
  width: 200px;
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -5px;
  right: 20px;
  height: 20px;
  width: 20px;
  background: var(--secondary-bg);
  transform: rotate(45deg);
}

.dropdown-menu.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition: var(--speed) ease;
}

.dropdown-menu.inactive {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: var(--speed) ease;
}

h3 {
  width: 100%;
  text-align: center;
  font-size: 18px;
  padding: 20px 0;
  font-weight: 500;
  font-size: 18px;
  color: var(--primary-text-color);
  line-height: 1.2rem;
}

h3 span {
  font-size: 14px;
  color: var(--secondary-text-color);
  font-weight: 400;
}

.dropdown-menu ul li {
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-menu ul li:hover a {
  color: rgb(212, 33, 9);
  cursor: pointer;
}

.dropdown-menu ul li:hover img {
  opacity: 1;
  cursor: pointer;
}

.dropdownItem {
  display: flex;
  margin: 10px auto;
}

.dropdownItem img {
  max-width: 20px;
  margin-right: 10px;
  opacity: 0.5;
  transition: var(--speed);
}

.dropdownItem a {
  max-width: 100px;
  margin-left: 10px;
  transition: var(--speed);
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
