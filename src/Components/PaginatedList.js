import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination"; // Import the Pagination component

const PaginatedList = ({ apiUrl }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}&offset=${(currentPage - 1) * itemsPerPage}`);
        setItems(response.data.data.results);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [apiUrl, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="paginated-list">
      {items.map((item) => (
        <div className="item" key={item.id}>
          {/* Render item content here */}
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalCount={items.length} // Update with the total count from the API if available
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PaginatedList;