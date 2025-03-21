# Star Wars Character App

## Overview

This is a React-based web application that displays Star Wars characters fetched from the SWAPI (Star Wars API). Users can view character details, search for characters, and filter them by species, homeworld, or films.


## Features

- Character Cards: Display character names and random images.
- Search: Search for characters by name.
- Filters: Filter characters by species, homeworld, or films.
- Character Modal: View detailed information about a character.


## Setup Instructions

### Clone the Repository

- git clone https://github.com/tsikot39/star-wars-characters.git
- cd star-wars-characters-app

### Install dependencies

npm install

### Run the App

npm start


## Thought Process and Assumptions

### Thought Process

#### Data Fetching
- The app fetches data from the SWAPI in a structured way, ensuring all necessary details (species, homeworld, films) are available for each character.
- Pagination is handled to load only the first 12 characters initially for better performance.

#### UI/UX
- The app uses a card-based layout for characters, making it visually appealing and easy to navigate.
- A loading spinner is displayed while data is being fetched to improve user experience.

#### Search and Filters
- Search and filter functionalities are combined to allow users to refine results dynamically.
- Filters are applied in real-time as the user selects options.

### Assumptions

#### API Data
- The SWAPI will always return valid data for characters, species, homeworlds, and films.
- If a character has no species, its card color is set to Gray or #1a1a2e.

#### User Behavior
- Users will primarily search for characters by name and filter by species, homeworld, or films.
- Users will click on character cards to view detailed information.

#### Performance
- Loading only 12 characters initially ensures the app loads quickly.
- Pagination is only shown when search or filters are applied to avoid unnecessary complexity.


## Technologies Used
- Frontend: React, CSS
- API: SWAPI (Star Wars API)
- Build Tool: Create React App


## Site URL
- Deployed in Vercel: https://jbc-star-wars-characters.vercel.app/
