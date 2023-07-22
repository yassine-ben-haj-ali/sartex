import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CartItem from "../Components/CartItem";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";

const OrderDetails = () => {
  const { id } = useParams();
  const [Order, setOrder] = useState();
  const { Token } = useSelector((state) => state.auth);
  const getOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/order/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      console.log(res.data);
      setOrder(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrder();
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
        <section className="h-100">
          <div className="container py-5 mt-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-10">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-normal mb-0 text-black">Order Products</h3>
                </div>
                {Order?.products.map((product, idx) => (
                  <CartItem
                    product={{
                      ...product.productId,
                      quantity: product.quantity,
                      total: product.total,
                    }}
                    key={idx}
                  />
                ))}
                <div className="d-flex justify-content-between p-2 mb-2">
                  <h5 className="fw-bold mb-0">Total:</h5>
                  <h5 className="fw-bold mb-0">${Order?.totalPrice}</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderDetails;
