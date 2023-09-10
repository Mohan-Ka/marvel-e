import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import ComicCard from './ComicCard';
import axios from "axios";

export const Main = () => {
  const [activeTab, setActiveTab] = useState("characters");
  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    // Fetch characters
    const fetchCharacters = async () => {
      const characterUrl = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=fbdd9092bf76c59fed244fe862f3af0c&hash=035bee483e1bc4501bd80d402cb6f11c";
      const res = await axios.get(characterUrl);
      setCharacters(res.data.data.results);
    };

    // Fetch comics
    const fetchComics = async () => {
      const comicsUrl = "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=fbdd9092bf76c59fed244fe862f3af0c&hash=035bee483e1bc4501bd80d402cb6f11c";
      const res = await axios.get(comicsUrl);
      setComics(res.data.data.results);
    };

    if (activeTab === "characters") {
      fetchCharacters();
    } else if (activeTab === "comics") {
      fetchComics();
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="header">
        <div className="bg">
          <img src="./Images/MarvelLogo.jpg" alt="" />
        </div>

        <div className="search-bar">
          {/*<img src="./Images/search.jpg" alt="logo" className=""/>*/}
          <input type="search" placeholder="Search Here" className="search" />
        </div>
        
      </div>
      <div className="tabs">
        <button id="char" onClick={() => handleTabChange("characters")} className={activeTab === "characters" ? "active-tab" : ""}>Characters</button>
        <button id= "com" onClick={() => handleTabChange("comics")} className={activeTab === "comics" ? "active-tab" : ""}>Comics</button>
      </div>

      

      <div className="content">
        {activeTab === "characters" && characters.length > 0 && <Card data={characters} />}
        {activeTab === "comics" && comics.length > 0 && <ComicCard data={comics} />}
        {!characters.length && !comics.length && <p>Not Found</p>}
      </div>
    </>
  );
};
