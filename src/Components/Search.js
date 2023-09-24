import React from "react";


const Search = ({ query, setQuery, onSearch }) => {
  return (
    <>
      <section>
        {/*{onSearch === "characters" ? "Character" : "Comic" }*/} 
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input className="search-bar"
              type="text"
              placeholder={` ${onSearch === "characters" ? "Search Your Favourite Characters" : "Search Your Favourite Comics"}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default Search;
