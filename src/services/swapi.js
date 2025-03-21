import axios from "axios";

const BASE_URL = "https://swapi.dev/api";

// Fetch all data from a given endpoint with pagination
const fetchAllData = async (endpoint) => {
  let allData = [];
  let url = `${BASE_URL}/${endpoint}/`;

  while (url) {
    const response = await axios.get(url);
    allData = allData.concat(response.data.results);
    url = response.data.next; // Get the next page URL
  }

  return allData;
};

// Fetch all characters
export const fetchCharacters = async () => {
  return fetchAllData("people");
};

// Fetch homeworld details
export const fetchHomeworld = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

// Fetch film details
export const fetchFilms = async (filmUrls) => {
  const films = await Promise.all(
    filmUrls.map(async (url) => {
      const response = await axios.get(url);
      return response.data.title;
    })
  );
  return films;
};

// Fetch all species
export const fetchAllSpecies = async () => {
  return fetchAllData("species");
};

// Fetch all homeworlds
export const fetchAllHomeworlds = async () => {
  return fetchAllData("planets");
};

// Fetch all films
export const fetchAllFilms = async () => {
  return fetchAllData("films");
};
