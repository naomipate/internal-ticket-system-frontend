import React, { useContext } from "react";
import { SearchContext } from "../context/context";
import { searchTicket } from "../API/API";
import { isEmpty } from "validator";

function SearchBar() {
  const { searchTerm, setSearchResults, setSearchTerm } =
    useContext(SearchContext);

  async function handleSearch(e) {
    e.preventDefault();

    if (isEmpty(searchTerm)) {
      setSearchResults([
        {
          id: 0,
          name: "Empty is not valid search",
          global_sales: 0.0,
        },
      ]);
    } else {
      try {
        let result = await searchTicket(searchTerm);
        setSearchResults(result.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container">
      <form className="d-flex" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          // onFocus={() => setIsSearching(true)}
          // onBlur={() => setIsSearching(false)}
        ></input>
        <button className="btn btn-secondary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
