import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "../Slices/Auth";
import Logo from "../assets/sartex.jpg";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8800/auth/login", {
        email: Email,
        password: Password,
      });
      dispatch(
        setCredentials({
          Details: response.data.marque,
          Token: response.data.token,
        })
      );
      notification.success({ message: "Marque logged in with success" });
      navigate("/products");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div
      class="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div class="d-flex align-items-center justify-content-center w-100">
          <div class="row justify-content-center w-100">
            <div class="col-md-8 col-lg-6 col-xxl-3">
              <div class="card mb-0">
                <div class="card-body">
                  <a
                    href="/"
                    class="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                    <img src={Logo} width="180" alt="" />
                  </a>
                  <p class="text-center">Your Social Campaigns</p>
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div class="mb-4">
                      <label for="exampleInputPassword1" class="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <a
                      onClick={(e) => handleSubmit(e)}
                      class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                    >
                      Sign In
                    </a>
                  </form>
                  {Error && (
                    <div class="alert alert-danger" role="alert">
                      {Error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
