import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/sartex.jpg"
const HomeNavbar = () => {
    const {count}=useSelector((state)=>state.cart);
    const navigate=useNavigate();
  return (
    <nav class="navbarhome navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div class="container">
        <a
          class="navbar-brand d-flex justify-content-between align-items-center order-lg-0"
          href="/"
        >
          <img src={Logo} alt="site icon" />
        </a>

        <div class="order-lg-2 nav-btns">
          <button type="button" class="btn position-relative" onClick={()=>navigate("/cart")}>
            <i class="fa fa-shopping-cart"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge bg-secondary">
              {count}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
