import React, { useEffect, useState } from "react";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState();
  const { Token } = useSelector((state) => state.auth);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/marque/${id}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
        console.log(response);
        setProfile(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProfile();
  }, [id]);
  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <SideBar />
      <div className="body-wrapper">
        <Navbar />
        <div class="main-wrapper">
          <div class="container">
            <div class="product-div">
              <div class="product-div-left">
                <div class="img-container">
                  <img
                    src={`http://localhost:8800/Assets/${profile?.picture}`}
                  />
                </div>
              </div>
              <div class="product-div-right">
                <span class="product-name">{profile?.name}</span>
                <span class="product-price">{profile?.email}</span>
                <div class="product-rating">
                  <span>
                    <i class="fas fa-star"></i>
                  </span>
                  <span>
                    <i class="fas fa-star"></i>
                  </span>
                  <span>
                    <i class="fas fa-star"></i>
                  </span>
                  <span>
                    <i class="fas fa-star"></i>
                  </span>
                  <span>
                    <i class="fas fa-star-half-alt"></i>
                  </span>
                  <span>{profile?.phone}</span>
                </div>
                <div className="description-card">
                  <p class="product-description">{profile?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
