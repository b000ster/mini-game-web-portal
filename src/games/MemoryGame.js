import React, { useState, useContext, useEffect, useCallback } from "react";
import Leaderboard from "../components/Leaderboard";
import { PlayerContext } from "../PlayerContext";

const symbols = ["😀", "🚗", "🌟", "🦄"];
function shuffledPairs() {
  return [...symbols, ...symbols].sort(() => Math.random() - 0.5);
}

export default function MemoryGame({ onBack }) {
  const [pairs, setPairs] = useState(shuffledPairs());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const { playerName } = useContext(PlayerContext);

  function resetGame() {
    setPairs(shuffledPairs());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setShowCompletedModal(false);
  }

  function handleFlip(i) {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setTimeout(() => {
        if (pairs[newFlipped[0]] === pairs[newFlipped[1]]) {
          setMatched(matched => [...matched, ...newFlipped]);
        }
        setFlipped([]);
      }, 700);
    }
  }

  const gameComplete = matched.length === pairs.length;

  const saveScore = useCallback(() => {
    if (!playerName) return;
    const key = "leaderboard-memory";
    const board = JSON.parse(localStorage.getItem(key) || "[]");
    board.push({ name: playerName, moves, date: new Date().toISOString() });
    board.sort((a, b) => a.moves - b.moves);
    localStorage.setItem(key, JSON.stringify(board.slice(0, 10)));
  }, [moves, playerName]);

  useEffect(() => {
    if (gameComplete) {
      saveScore();
      setShowCompletedModal(true);
    }
  }, [gameComplete, saveScore]);

  // 3-star animation styles for modal:
  const starStyle = {
    fontSize: "2.8rem",
    color: "#f8c210",
    margin: "0 0.5rem",
    animation: "starAnimate 1.5s ease-in-out infinite",
  };

  const btnStyle = {
    background: "#3a5998",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "0.39rem 1.13rem",
    fontWeight: 650,
    cursor: "pointer",
    marginRight: 8,
  };

  return (
    <>
      <div style={{ filter: showCompletedModal ? "blur(4px)" : "none", pointerEvents: showCompletedModal ? "none" : "auto" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "15px", justifyContent: "center" }}>
          <button onClick={onBack} style={btnStyle}>Back</button>
          <button onClick={resetGame} style={btnStyle}>Reset</button>
          <button onClick={() => setShowLeaderboard(true)} style={btnStyle}>Leaderboard</button>
        </div>

        <h3>Memory Game</h3>
        <p>Moves: {moves}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 60px)", gap: "8px", justifyContent: "center" }}>
          {pairs.map((sym, i) => (
            <div
              key={i}
              className="memory-card"
              style={{
                width: 56,
                height: 56,
                background: flipped.includes(i) || matched.includes(i) ? "#d1edfa" : "#aaa",
                fontSize: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 7,
                cursor: "pointer",
                userSelect: "none"
              }}
              onClick={() => handleFlip(i)}
            >
              {(flipped.includes(i) || matched.includes(i)) ? sym : ""}
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <Leaderboard
          entries={JSON.parse(localStorage.getItem("leaderboard-memory") || "[]")}
          scoreLabel="Moves"
          scoreKey="moves"
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* Game Completed Modal */}
      {showCompletedModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 9999,
          color: "white", flexDirection: "column", fontSize: "1.8rem",
          fontWeight: "bold"
        }}>
          <div style={{
            background: "#2e3e5c",
            borderRadius: 12,
            padding: "2rem 3rem",
            textAlign: "center",
            userSelect: "none"
          }}>
            <div>🎉 Game Completed! 🎉</div>
            <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
              <span style={{ ...starStyle, animationDelay: "0s" }}>★</span>
              <span style={{ ...starStyle, animationDelay: "0.3s" }}>★</span>
              <span style={{ ...starStyle, animationDelay: "0.6s" }}>★</span>
            </div>
            <button onClick={() => { setShowCompletedModal(false); resetGame(); }} style={{
              marginTop: "1.5rem",
              background: "#3a5998",
              border: "none",
              borderRadius: 7,
              padding: "0.6rem 1.5rem",
              color: "white",
              fontWeight: 600,
              cursor: "pointer"
            }}>Play Again</button>
          </div>
          {/* CSS for stars animation */}
          <style>{`
            @keyframes starAnimate {
              0%, 100% { transform: scale(1); color: #f8c210; }
              50% { transform: scale(1.5); color: #ffd700; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
