import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import SideBar from "../Components/SideBar";
import "./style.css";
import Pagination from "../Components/Pagination";
import { Modal, notification } from "antd";

const Marques = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [deleteMarque, setDeleteMarque] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editMarque, setEditMarque] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    picture: "",
    description: "",
    phone: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 5;
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleCreateFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8800/marque", createFormData, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      notification.success({ message: "marque has been created with success" });

      setCreateFormVisible(false);
      setCreateFormData({
        name: "",
        email: "",
        password: "",
      });
      getMarques(); // Refresh the product list
    } catch (err) {
      notification.success({ message: err.response.data });
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
      await axios.delete(`http://localhost:8800/marque/${deleteMarque._id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      notification.success({ message: "marque has been deleted with success" });
      setDeleteMarque(null);
      setDeleteModalVisible(false);
      getMarques(); // Refresh the product list
    } catch (err) {
      notification.error({ message: err.response.data });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteMarque(null);
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

  const getMarques = async () => {
    try {
      const res = await axios.get("http://localhost:8800/marque/", {
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
    getMarques();
  }, []);

  const handleDeleteButtonClick = (product) => {
    setDeleteMarque(product);
    setDeleteModalVisible(true);
  };

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", editFormData.name);
    formData.append("phone", editFormData.phone);
    formData.append("file", editFormData.picture);
    formData.append("description", editFormData.description);

    try {
      await axios.put(
        `http://localhost:8800/marque/${editMarque._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      notification.success({ message: "marque has been updated with success" });
      setEditMarque(null);
      setEditModalVisible(false);
      getMarques(); // Refresh the product list
    } catch (err) {
      notification.success({ message: err.response.data });
    }
  };

  const handleEditFormChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditButtonClick = (marque) => {
    setEditMarque(marque);
    setEditFormData({
      name: marque.name,
      phone: marque.phone,
      description: marque.description || "",
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="search-button" onClick={handleCreateButtonClick}>
              create marque
            </button>

            <div className="search-container">
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
                  <th scope="col">email</th>
                  <th scope="col">actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row) => (
                  <tr key={row._id}>
                    <th scope="row">
                      <a href={`/profile/${row._id}`}>{row.name}</a>
                    </th>
                    <td>
                      <img
                        src={`http://localhost:8800/Assets/${row.picture}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{row.email}</td>
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
        title="Delete Marque"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this marque?</p>
        <p>Marque Name: {deleteMarque && deleteMarque.name}</p>
      </Modal>
      <Modal
        title="Edit Marque"
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
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={editFormData.phone}
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
        title="Create Marque"
        visible={createFormVisible}
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
            <label htmlFor="email">email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={createFormData.email}
              onChange={handleCreateFormChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={createFormData.password}
              onChange={handleCreateFormChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Marques;
