import axios from "axios";
import React from "react";
import ModelViewer from "react-ar-viewer";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div class="col-md-6 col-lg-4 col-xl-3 p-2 best">
      <div class="collection-img position-relative">
        <ModelViewer
          buttonImage={"https://picsum.photos/200/200"}
          buttonText={"View in your space"}
          width={"45vh"}
          height={"30vh"}
          src={`http://localhost:8800/Assets/${item.picture}`}
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
        <span class="position-absolute bg-primary text-white d-flex align-items-center justify-content-center">
          sale
        </span>
      </div>
      <div class="text-center">
        <p class="text-capitalize my-1">{item.name}</p>
        <span class="fw-bold">$ {item.price}</span>
      </div>
      <div class="d-flex justify-content-center">
        <button
          className="btn btn-primary"
          style={{ marginTop: "15px" }}
          onClick={() => navigate(`/product/${item._id}`)}
        >
          view details
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
