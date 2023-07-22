import React from "react";
import Logo from "../assets/sartex.jpg";
import { useSelector } from "react-redux";
const SideBar = () => {
  const { Details } = useSelector((state) => state.auth);
  return (
    <aside class="left-sidebar">
      <div>
        <div class="brand-logo d-flex align-items-center justify-content-between">
          <a class="text-nowrap logo-img">
            <img src={Logo} width="180" alt="" />
          </a>
          <div
            class="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i class="ti ti-x fs-8"></i>
          </div>
        </div>
        <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li class="sidebar-item">
              <a class="sidebar-link" href="/products" aria-expanded="false">
                <span>
                  <i class="ti ti-layout-dashboard"></i>
                </span>
                <span class="hide-menu">Products</span>
              </a>
            </li>
            {Details&&Details.role == "Admin" && (
              <li class="sidebar-item">
                <a class="sidebar-link" href="/marques" aria-expanded="false">
                  <span>
                    <i class="ti ti-layout-dashboard"></i>
                  </span>
                  <span class="hide-menu">Marques</span>
                </a>
              </li>
            )}
            {Details&&Details.role == "Admin" && (
              <li class="sidebar-item">
                <a class="sidebar-link" href="/orders" aria-expanded="false">
                  <span>
                    <i class="ti ti-layout-dashboard"></i>
                  </span>
                  <span class="hide-menu">Orders</span>
                </a>
              </li>
            )}
             {Details&&Details.role == "Admin" && (
              <li class="sidebar-item">
                <a class="sidebar-link" href="/statistics" aria-expanded="false">
                  <span>
                    <i class="ti ti-layout-dashboard"></i>
                  </span>
                  <span class="hide-menu">Statistics</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
