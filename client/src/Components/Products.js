import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import axios from "axios";
import { Pagination } from "antd";

const Products = () => {
  const [Products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 5;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/product/");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);
  const filteredData = Products.filter((row) =>
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
  return (
    <div class="collection-list mt-4 row gx-0 gy-3">
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
      {filteredData.map((item) => (
        <ProductItem key={item._id} item={item} />
      ))}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;
