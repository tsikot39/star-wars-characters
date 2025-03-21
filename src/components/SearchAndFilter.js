import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchAndFilter.css";

const SearchAndFilter = ({
  onSearch,
  onFilter,
  species,
  homeworlds,
  films,
}) => {
  return (
    <div className="search-and-filter">
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search characters"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <select onChange={(e) => onFilter("species", e.target.value)}>
        <option value="">Filter by species</option>
        {species.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <select onChange={(e) => onFilter("homeworld", e.target.value)}>
        <option value="">Filter by homeworld</option>
        {homeworlds.map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <select onChange={(e) => onFilter("films", e.target.value)}>
        <option value="">Filter by films</option>
        {films.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;
