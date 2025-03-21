import React from "react";
import ReactModal from "react-modal";
import "./CharacterModal.css";

const CharacterModal = ({
  character,
  isOpen,
  onRequestClose,
  homeworld,
  films,
}) => {
  const { name, height, mass, created, birth_year } = character || {};

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Character Details"
      className="character-modal"
      overlayClassName="character-modal-overlay"
    >
      <h2>{name}</h2>
      <p>Height: {height} meters</p>
      <p>Mass: {mass} kg</p>
      <p>Date Added: {new Date(created).toLocaleDateString("en-GB")}</p>
      <p>Birth Year: {birth_year}</p>
      <p>Number of Films: {films?.length}</p>
      <h3>Homeworld</h3>
      <p>Name: {homeworld?.name}</p>
      <p>Terrain: {homeworld?.terrain}</p>
      <p>Climate: {homeworld?.climate}</p>
      <p>Residents: {homeworld?.population}</p>
    </ReactModal>
  );
};

export default CharacterModal;
