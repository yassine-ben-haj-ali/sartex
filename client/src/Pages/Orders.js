import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Components/SideBar";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import Pagination from "../Components/Pagination";
import { notification } from "antd";

const Orders = () => {
  const [Orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 5;

  const { Token } = useSelector((state) => state.auth);
  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8800/order/", {
        headers: { Authorization: `Bearer ${Token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  const handleConfirm = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8800/order/${id}/confirm`,
        null,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      notification.success({ message: "order has been approved with success" });
      getOrders();
    } catch (err) {
      notification.error({ message: err.response.data });
    }
  };
  const handleReject = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8800/order/${id}/reject`,
        null,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      notification.success({
        message: "product has been rejected with success",
      });
      getOrders();
    } catch (err) {
      notification.error({ message: err.response.data });
    }
  };
  const filteredData = Orders.filter(
    (row) =>
      row.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.lastname.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                <th scope="col">email</th>
                <th scope="col">city</th>
                <th scope="col">state</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row._id}>
                  <th scope="row">
                    <a
                      href={`/orders/${row._id}`}
                    >{`${row.firstname} ${row.lastname}`}</a>
                  </th>
                  <td>{row.email}</td>
                  <td>{row.city}</td>
                  <td>{row.state}</td>

                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleConfirm(row._id)}
                    >
                      approve
                    </button>

                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "20px" }}
                      onClick={() => handleReject(row._id)}
                    >
                      reject
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
  );
};

export default Orders;
