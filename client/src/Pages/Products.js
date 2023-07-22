import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import "./style.css";
import ModelViewer from "react-ar-viewer";
import Pagination from "../Components/Pagination";
import { Modal, notification } from "antd";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    picture: "",
    description: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 5;
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    price: "",
    picture: "",
    description: "",
  });

  const handleCreateFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", createFormData.name);
    formData.append("price", createFormData.price);
    formData.append("file", createFormData.picture);
    formData.append("description", createFormData.description);

    try {
      await axios.post("http://localhost:8800/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Token}`,
        },
      });
      notification.success({
        message: "product has been created with success",
      });
      setCreateFormVisible(false);
      setCreateFormData({
        name: "",
        price: "",
        picture: "",
        description: "",
      });
      getProducts(); // Refresh the product list
    } catch (err) {
      notification.error({ message: err.response.data });
    }
  };

  const handleCreateFormChange = (event) => {
    setCreateFormData({
      ...createFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateButtonClick = () => {
    setCreateFormVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8800/product/${deleteProduct._id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      notification.success({
        message: "product has been deleted with success",
      });
      setDeleteProduct(null);
      setDeleteModalVisible(false);
      getProducts(); // Refresh the product list
    } catch (err) {
      notification.error({ message: err.response.data });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteProduct(null);
    setDeleteModalVisible(false);
  };
  const handleImageChange = (event) => {
    setEditFormData({
      ...editFormData,
      picture: event.target.files[0],
    });
  };

  // Function to filter table data based on search term
  const filteredData = tableData.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Calculate the starting and ending indices of the rows to be shown
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Get the rows for the current page
  const currentRows = filteredData.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const { Token } = useSelector((state) => state.auth);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8800/product/marque", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      setTableData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDeleteButtonClick = (product) => {
    setDeleteProduct(product);
    setDeleteModalVisible(true);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", editFormData.name);
    formData.append("price", editFormData.price);
    formData.append("file", editFormData.picture);
    formData.append("description", editFormData.description);

    try {
      await axios.put(
        `http://localhost:8800/product/${editProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      notification.success({
        message: "product has been updated with success",
      });
      setEditProduct(null);
      setEditModalVisible(false);
      getProducts(); // Refresh the product list
    } catch (err) {
      notification.error({ message: err.response.data });
    }
  };

  const handleEditFormChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditButtonClick = (product) => {
    setEditProduct(product);
    setEditFormData({
      name: product.name,
      price: product.price,
    });
    setEditModalVisible(true);
  };

  return (
    <>
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
          <div>
            <div className="search-container">
              <button
                className="search-button"
                onClick={handleCreateButtonClick}
              >
                create product
              </button>
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">name</th>
                  <th scope="col">image</th>
                  <th scope="col">Price</th>
                  <th scope="col">actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row) => (
                  <tr key={row._id}>
                    <th scope="row">{row.name}</th>
                    <td>
                      <ModelViewer
                        buttonImage={"https://picsum.photos/200/200"}
                        buttonText={"View in your space"}
                        width={"20vh"}
                        height={"20vh"}
                        src={`http://localhost:8800/Assets/${row.picture}`}
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
                    </td>
                    <td>{row.price}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEditButtonClick(row)}
                      >
                        edit
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "20px" }}
                        onClick={() => handleDeleteButtonClick(row)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Delete Product"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this product?</p>
        <p>Product Name: {deleteProduct && deleteProduct.name}</p>
      </Modal>
      <Modal
        title="Edit Product"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <form onSubmit={handleEditFormSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={editFormData.price}
              onChange={handleEditFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="picture"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={editFormData.description}
              onChange={handleEditFormChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </Modal>
      <Modal
        title="Create Product"
        open={createFormVisible}
        onCancel={() => setCreateFormVisible(false)}
        footer={null}
      >
        <form onSubmit={handleCreateFormSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={createFormData.name}
              onChange={handleCreateFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={createFormData.price}
              onChange={handleCreateFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="picture"
              onChange={(e) =>
                setCreateFormData({
                  ...createFormData,
                  picture: e.target.files[0],
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={createFormData.description}
              onChange={handleCreateFormChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Products;
