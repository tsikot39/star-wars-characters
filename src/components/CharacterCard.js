import React from "react";
import "./CharacterCard.css";
import { speciesColors } from "./speciesColors";

const CharacterCard = ({ character, onClick }) => {
  const { name, speciesName } = character;
  const cardColor = speciesColors[speciesName] || speciesColors["Unknown"];

  return (
    <div
      className="character-card"
      style={{ backgroundColor: cardColor }}
      onClick={onClick}
    >
      <img src={`https://picsum.photos/200/300?random=${name}`} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default CharacterCard;
