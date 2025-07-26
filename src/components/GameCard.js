import React from "react";

export default function GameCard({ title, description, image, onPlay }) {
  return (
    <div className="game-card">
      <img src={image} alt={title} className="game-img" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onPlay}>Play</button>
    </div>
  );
}
