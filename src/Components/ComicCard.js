import React from "react";
import { useNavigate } from "react-router-dom";

const ComicCard = ({ data }) => {
  let navigate = useNavigate();

  return (
    <>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div className="card" key={item.id} onClick={() => navigate(`/comic/${item.id}`)}>
            <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
            <div className="title">
              <h3>{item.title}</h3>
            </div>
            <div>
              <p className="details">Page Count: {item.pageCount}</p>
              <p className="details">ISBN: {item.isbn}</p>
              <p className="details">Issue No.: {item.issueNumber}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </>
  );
};

export default ComicCard; // Export the ComicCard component
