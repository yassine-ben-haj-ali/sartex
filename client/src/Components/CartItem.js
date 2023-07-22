import { useEffect, useState } from "react";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearAll,
} from "../Slices/Cart";
import { useDispatch } from "react-redux";
import ModelViewer from "react-ar-viewer";
import { useSelector } from "react-redux";

function CartItem({ product }) {
  const dispatch = useDispatch();
  const { Token } = useSelector((state) => state.auth);
  return (
    <>
      <div class="card rounded-3 mb-4">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
              <ModelViewer
                buttonImage={"https://picsum.photos/200/200"}
                buttonText={"View in your space"}
                width={"20vh"}
                height={"20vh"}
                src={`http://localhost:8800/Assets/${product.picture}`}
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
            <div class="col-md-3 col-lg-3 col-xl-3">
              <p class="lead fw-normal mb-2">{product.name}</p>
              <p>
                <span class="text-muted">Size: </span>M{" "}
                <span class="text-muted">Color: </span>Grey
              </p>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              {!Token && (
                <button
                  class="btn btn-link px-2"
                  onClick={() => dispatch(decrementQuantity(product._id))}
                >
                  <i class="fas fa-minus"></i>
                </button>
              )}

              <input
                id="form1"
                name="quantity"
                value={product.quantity}
                type="number"
                class="form-control form-control-sm"
              />

              {!Token && (
                <button
                  class="btn btn-link px-2"
                  onClick={() => dispatch(incrementQuantity(product._id))}
                >
                  <i class="fas fa-plus"></i>
                </button>
              )}
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h5 class="mb-0">${product.total}</h5>
            </div>
            {!Token && (
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a
                  href="#!"
                  class="text-danger"
                  onClick={() => dispatch(removeItem(product._id))}
                >
                  <i class="fas fa-trash fa-lg"></i>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
