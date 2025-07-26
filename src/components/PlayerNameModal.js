import React, { useState, useContext } from "react";
import { PlayerContext } from "../PlayerContext";

export function PlayerNameModal() {
  const { playerName, setPlayerName } = useContext(PlayerContext);
  const [input, setInput] = useState("");

  if (playerName) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim()) setPlayerName(input.trim());
  }

  return (
    <div style={{
      position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
      background: "rgba(40,60,90,0.36)", zIndex: 5000,
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: "3rem 2.2rem",
        borderRadius: 14,
        boxShadow: "0 4px 18px #0c3a9822",
        display: "flex", flexDirection: "column", alignItems: "center",
        minWidth: 260
      }}>
        <h2 style={{ margin: "0 0 1.2rem 0", color: "#3a5998" }}>Welcome!</h2>
        <span style={{ marginBottom: "1.2rem", fontWeight: 500 }}>
          Enter your name to play & appear on leaderboards
        </span>
        <input
          value={input}
          required
          maxLength={18}
          placeholder="Your name"
          style={{
            fontSize: "1.08rem",
            padding: "0.6rem",
            borderRadius: 7,
            border: "1px solid #cde",
            marginBottom: "1rem",
            minWidth: 180
          }}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" style={{
          background: "#3a5998",
          color: "white",
          border: "none",
          borderRadius: 6,
          padding: "0.5rem 1.2rem",
          fontWeight: 650,
          cursor: "pointer"
        }}>Start</button>
      </form>
    </div>
  );
}
