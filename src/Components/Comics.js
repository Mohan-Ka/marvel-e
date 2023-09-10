import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export const Comics = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        //const res = await axios.get('https://gateway.marvel.com:443/v1/public/comics/1590?apikey=fbdd9092bf76c59fed244fe862f3af0c');
        const res = await axios.get(`https://gateway.marvel.com:443/v1/public/comics/${id}?ts=1&apikey=fbdd9092bf76c59fed244fe862f3af0c&hash=035bee483e1bc4501bd80d402cb6f11c`);
        if (res.data.data.results.length > 0) {
          setComic(res.data.data.results[0]);
        } else {
          setComic(null);
        }
      } catch (error) {
        console.error('Error fetching comic:', error);
        setComic(null);
      }
    };
    fetchComic();
  }, [id]);

  return (
    <div>
      {comic && (
        <div className="box-content">
          <div className="right-box">
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="" />
          </div>
          <div className="left-box">
            <h1>{comic.title}</h1>
            <h4>{comic.description}</h4>
          </div>
        </div>
      )}
    </div>
  );
};
