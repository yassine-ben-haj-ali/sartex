import React, { useEffect, useState } from "react";
import HomeNavbar from "../Components/HomeNavbar";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../Components/CartItem";
import { clearAll } from "../Slices/Cart";
import Footer from "../Components/Footer";
import axios from "axios";
import { notification } from "antd";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [Products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    setProducts(cart);
    calculateTotal(cart);
  }, [cart]);

  const calculateTotal = (cart) => {
    let sum = 0;
    cart.forEach((product) => {
      sum += product.total;
    });
    setTotal(sum);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        ...formData,
        products: Products.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
          total: product.total,
        })),
        totalPrice: total,
      };

      // Send the order data to the server
      const response = await axios.post(
        "http://localhost:8800/order/",
        orderData
      );
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        city: "",
        state: "",
        zip: "",
      });
      notification.success({
        message: "order has been sent with success to the administrator",
      });
      dispatch(clearAll());
    } catch (error) {
      notification.error({
        message: error.response.data,
      });
    }
  };

  return (
    <>
      <HomeNavbar />
      <section className="h-100" style={{ marginTop: "150px" }}>
        <div className="container py-5 mt-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(clearAll())}
                  >
                    clear all
                  </button>
                </div>
              </div>
              {Products.map((product) => (
                <CartItem product={product} key={product._id} />
              ))}
              <div className="d-flex justify-content-between p-2 mb-2">
                <h5 className="fw-bold mb-0">Total:</h5>
                <h5 className="fw-bold mb-0">${total}</h5>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4>Shopping Form</h4>
                  <form
                    className="row g-3 needs-validation"
                    style={{ marginTop: "20px" }}
                    onSubmit={handleSubmit}
                  >
                    <div className="col-md-6 position-relative">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 position-relative">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 position-relative">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 position-relative">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 position-relative">
                      <label htmlFor="state" className="form-label">
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 position-relative">
                      <label htmlFor="zip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
                        Order Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
