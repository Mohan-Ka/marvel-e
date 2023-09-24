import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import ComicCard from "./ComicCard";
import Search from "./Search";
import axios from "axios";

export const Main = () => {
  const [activeTab, setActiveTab] = useState("characters");
  const [characters, setCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [noOfElement, setNoOfElement] = useState(4);

  const [characterOffset, setCharacterOffset] = useState(0);
  const [comicOffset, setComicOffset] = useState(0); // Add comic offset
  
  const [filter, setFilter] = useState("modified"); // Default filter by Modified Date
  const [sort, setSort] = useState("asc"); 

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const ts = 1;
        const apiKey = "fbdd9092bf76c59fed244fe862f3af0c";
        const hash = "035bee483e1bc4501bd80d402cb6f11c";
        const params = { ts, apikey: apiKey, hash, limit: 4 };
        
        const orderBy = `${sort === "asc" ? "" : "-"}${filter}`;

        if (activeTab === "characters") {
          params.nameStartsWith = query;
          params.limit = 4; 
          params.offset = characterOffset; // Set the offset for char
          const characterUrl = "http://gateway.marvel.com/v1/public/characters";
          const res = await axios.get(characterUrl, { params });
          setCharacters([...characters, ...res.data.data.results]);
        } else if (activeTab === "comics") {
          params.titleStartsWith = query;
          params.limit = 4; // Set the limit for comics
          params.offset = comicOffset; // Set the offset for comics
          params.orderBy = orderBy; // Apply sorting
          const comicsUrl = "http://gateway.marvel.com/v1/public/comics";
          const res = await axios.get(comicsUrl, { params });
          setComics([...comics, ...res.data.data.results]); // Append new comics
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error(`Error fetching ${activeTab}:`, error);
      }
    };

    fetchData();
  }, [activeTab, query, characterOffset, comicOffset, filter, sort]); // Update when comicOffset changes

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setComicOffset(0); // Reset comic offset when filter changes
    setComics([]); // Clear comics when filter changes
  };

  const handleSortChange = (selectedSort) => {
    setSort(selectedSort);
    setComicOffset(0); // Reset comic offset when sort changes
    setComics([]); // Clear comics when sort changes
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCharacterOffset(0);
    setComicOffset(0); // Reset comic offset when tab changes
    setCharacters([]);
    setComics([]); // Clear comics when tab changes
  };

  const handleLoadMoreCharacters = () => {
    setCharacterOffset(characterOffset + noOfElement);
  }

  const handleLoadMoreComics = () => {
    setComicOffset(comicOffset + noOfElement);
  }

  return (
    <>
      <div className="header">
        <div className="bg">
          <img src="./Images/MarvelLogo.jpg" alt="" />
        </div>
      </div>
      <div className="tabs">
        <button
          id="char"
          onClick={() => handleTabChange("characters")}
          className={activeTab === "characters" ? "active-tab" : ""}
        >
          Characters
        </button>
        <button
          id="com"
          onClick={() => handleTabChange("comics")}
          className={activeTab === "comics" ? "active-tab" : ""}
        >
          Comics
        </button>
      </div>

      <div className="filter">
        <label>Filter by:</label>
        <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="modified">Modified Date</option>
          <option value="name">Name</option>
        </select>
        <label>  Sort by:</label>
        <select value={sort} onChange={(e) => handleSortChange(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Search component for both characters and comics */}
      <Search query={query} setQuery={setQuery} onSearch={activeTab} />

      <div className="content">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <img src="./Images/Spider.jpg" alt="" width="1200px" />
        ) : activeTab === "characters" && characters.length > 0 ? (
          <>
            <Card data={characters} />
            {characters.length >= noOfElement && (
              <button onClick={handleLoadMoreCharacters} className="load-more-button">Load More Characters</button>
            )}
          </>
        ) : activeTab === "comics" && comics.length > 0 ? (
          <>
            <ComicCard data={comics} />
            {comics.length >= noOfElement && (
              <button onClick={handleLoadMoreComics} className="load-more-button">Load More Comics</button>
            )}
          </>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </>
  );
};
