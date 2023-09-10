import React, { useState } from "react";

export const CharacterFilter = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="character-filter">
      <input
        type="text"
        placeholder="Search Characters"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CharacterFilter;