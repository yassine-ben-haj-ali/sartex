import React, { useEffect, useState } from "react";
import HomeNavbar from "../Components/HomeNavbar";
import { useParams } from "react-router-dom";
import ModelViewer from "react-ar-viewer";
import axios from "axios";
import Footer from "../Components/Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slices/Cart";
import { useSelector } from "react-redux";
import { notification } from "antd";

const ProductDetails = () => {
  const { Token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/product/details/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ id: product._id, item: product }));
      notification.success({ message: "product added to cart with success" });
    }
  };
  return (
    <>
      <div class="main-wrapper">
        <div class="container">
          <div class="product-div">
            <div class="product-div-left">
              <div class="img-container">
                <ModelViewer
                  buttonImage={"https://picsum.photos/200/200"}
                  buttonText={"View in your space"}
                  width={"45vh"}
                  height={"30vh"}
                  src={`http://localhost:8800/Assets/${product?.picture}`}
                  iosSrc={"https://model.usdz"}
                  poster={"https://picsum.photos/200/200"}
                  alt={"Sample usage on component"}
                  cameraControls={true}
                  ar={true}
                  cameraTarget={"0m 0m 0m"}
                  cameraOrbit={"0 deg 0deg 0%"}
                  exposure={1}
                  shadowSoftness={0}
                  autoPlay={true}
                />
              </div>
            </div>
            <div class="product-div-right">
              <span class="product-name">(New) {product?.name}</span>
              <span class="product-price">$ {product?.price}</span>
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
                <span>(350 ratings)</span>
              </div>
              <div className="description-card">
                <p className="product-description">{product?.description}</p>
              </div>

              {!Token && (
                <div class="btn-groups">
                  <button
                    type="button"
                    class="add-cart-btn btn btn-primary"
                    onClick={handleAddToCart}
                  >
                    <i class="fas fa-shopping-cart"></i>add to cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
