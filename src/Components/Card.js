import React from "react";
import { useNavigate } from "react-router-dom";

export const Card = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div className="card" key={item.id} onClick={() => navigate(`/character/${item.id}`)}>
            <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
            <div className="title">
              <h3>{item.name}</h3>
              
            </div>
            <p className="Comi">Comics ({item.comics.available})</p>
              <p className="Comi">Stories ({item.stories.available})</p>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </>
  );
};