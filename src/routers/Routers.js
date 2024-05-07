import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import Login from "../components/Authentic/Login";
import Register from "../components/Authentic/Register";
import CarForm from "../pages/CarForm";
import Rent from '../components/UI/Rent';
import AdminLogin from "../components/Authentic/AdminLogin";
import Report from "../pages/Report"
import UserProfile from "../components/UI/UserProfile";
import GoToLogin from "../pages/GoToLogin";
import UserPrivate from "../components/UI/UserPrivate";
import AdminPrivate from "../components/UI/AdminPrivate";
import SearchDisplay from "../pages/SearchDisplay";
import MyRents from "../pages/MyRents";

const Routers = () => {
  return (
    <Routes>
      <Route path="/gotologin" element={< GoToLogin />} />
      <Route path="/" element={<Navigate to="/home/:email" />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home/:email" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/rent/:slug" element={<UserPrivate><Rent /></UserPrivate>} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/createOrder" element={<createOder/>}/>
      <Route path="/profile" element={<UserPrivate><UserProfile/></UserPrivate>}/>
      <Route path="/carform" element={<AdminPrivate><CarForm/></AdminPrivate>}/>
      <Route path="/report" element={<AdminPrivate><Report/></AdminPrivate>}/>
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/searchdisplay" element={<SearchDisplay/>}></Route>
      <Route path="/myrents" element={<MyRents/>}></Route>
    </Routes>
  );
};

export default Routers;
