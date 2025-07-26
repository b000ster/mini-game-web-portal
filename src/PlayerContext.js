import React, { createContext, useState, useEffect } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [playerName, setPlayerName] = useState(() => localStorage.getItem("playerName") || "");

  useEffect(() => {
    localStorage.setItem("playerName", playerName);
  }, [playerName]);

  return (
    <PlayerContext.Provider value={{ playerName, setPlayerName }}>
      {children}
    </PlayerContext.Provider>
  );
}
