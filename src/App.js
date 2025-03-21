import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchCharacters,
  fetchHomeworld,
  fetchFilms,
  fetchAllSpecies,
  fetchAllHomeworlds,
  fetchAllFilms,
} from "./services/swapi";
import CharacterCard from "./components/CharacterCard";
import CharacterModal from "./components/CharacterModal";
import SearchAndFilter from "./components/SearchAndFilter";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({ type: "", value: "" });
  const [species, setSpecies] = useState([]);
  const [homeworlds, setHomeworlds] = useState([]);
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [isSearchOrFilterActive, setIsSearchOrFilterActive] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [charactersData, speciesData, homeworldsData, filmsData] =
          await Promise.all([
            fetchCharacters(), // Fetch first 12 characters
            fetchAllSpecies(), // Fetch all species
            fetchAllHomeworlds(), // Fetch all planets
            fetchAllFilms(), // Fetch all films
          ]);

        // Process characters (add species, films, homeworlds)
        const charactersWithSpecies = await Promise.all(
          charactersData.map(async (character) => {
            if (character.species.length > 0) {
              const speciesResponse = await axios.get(character.species[0]);
              character.speciesName = speciesResponse.data.name;
            } else {
              character.speciesName = "Unknown";
            }
            return character;
          })
        );

        const charactersWithFilms = await Promise.all(
          charactersWithSpecies.map(async (character) => {
            const filmTitles = await fetchFilms(character.films);
            character.filmTitles = filmTitles;
            return character;
          })
        );

        const charactersWithHomeworlds = await Promise.all(
          charactersWithFilms.map(async (character) => {
            const homeworldResponse = await fetchHomeworld(character.homeworld);
            character.homeworldName = homeworldResponse.name;
            return character;
          })
        );

        // Set the processed characters and other data to state
        setCharacters(charactersWithHomeworlds);
        setFilteredCharacters(charactersWithHomeworlds);
        setSpecies(speciesData.map((s) => s.name));
        setHomeworlds(homeworldsData.map((h) => h.name));
        setFilms(filmsData.map((f) => f.title));
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCharacterClick = async (character) => {
    try {
      const homeworld = await fetchHomeworld(character.homeworld);
      const films = await fetchFilms(character.films);
      setSelectedCharacter({ ...character, homeworld, films });
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch character details:", err);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsSearchOrFilterActive(!!term); // Set to true if term is not empty
    applyFilters(term, filter.type, filter.value);
    if (!term) {
      setCurrentPage(1); // Reset to the first page
      setIsSearchOrFilterActive(false); // Reset pagination visibility
    }
  };

  const handleFilter = (type, value) => {
    setFilter({ type, value });
    setIsSearchOrFilterActive(!!value); // Set to true if a filter is applied
    applyFilters(searchTerm, type, value);
    if (!value) {
      setCurrentPage(1); // Reset to the first page
      setIsSearchOrFilterActive(false); // Reset pagination visibility
    }
  };

  const applyFilters = (searchTerm, filterType, filterValue) => {
    let filtered = characters;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters
    if (filterType && filterValue) {
      switch (filterType) {
        case "species":
          filtered = filtered.filter(
            (character) => character.speciesName === filterValue
          );
          break;
        case "homeworld":
          filtered = filtered.filter(
            (character) => character.homeworldName === filterValue
          );
          break;
        case "films":
          filtered = filtered.filter((character) =>
            character.filmTitles.includes(filterValue)
          );
          break;
        default:
          break;
      }
    }

    setFilteredCharacters(filtered);
    setCurrentPage(1); // Reset to the first page after applying filters
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCharacters.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <h1>Star Wars Characters</h1>
      <SearchAndFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        species={species}
        homeworlds={homeworlds}
        films={films}
      />
      <div className="character-list">
        {currentItems.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            onClick={() => handleCharacterClick(character)}
          />
        ))}
      </div>

      {/* Conditionally render pagination */}
      {isSearchOrFilterActive && filteredCharacters.length > itemsPerPage && (
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredCharacters.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        homeworld={selectedCharacter?.homeworld}
        films={selectedCharacter?.films || []}
      />
    </div>
  );
};

export default App;
