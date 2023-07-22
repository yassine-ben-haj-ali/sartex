import { useState, useEffect } from "react";
import axios from "axios";

const useDataFetching = (url, token, pageSize) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedData = response.data;
        const totalItems = fetchedData.length;
        const calculatedTotalPages = Math.ceil(totalItems / pageSize);
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const slicedData = fetchedData.slice(startIndex, endIndex);

        setData(slicedData);
        setTotalPages(calculatedTotalPages);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    data,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useDataFetching;
