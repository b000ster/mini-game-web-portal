import React, { useState, useContext, useEffect } from "react";
import { PlayerContext } from "../PlayerContext";
import Leaderboard from "../components/Leaderboard";

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

function getShuffledTiles() {
  let arr = [...Array(TILE_COUNT).keys()];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isSolved(arr) {
  for (let i = 0; i < TILE_COUNT - 1; i++) {
    if (arr[i] !== i + 1) return false;
  }
  return arr[TILE_COUNT - 1] === 0;
}

export default function FifteenPuzzle({ onBack }) {
  const { playerName } = useContext(PlayerContext);
  const [tiles, setTiles] = useState(getShuffledTiles());
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // Save time played (simple)
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = null;
    if (!won) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [won]);

  useEffect(() => {
    if (won) saveScore();
    // eslint-disable-next-line
  }, [won]);

  function resetGame() {
    setTiles(getShuffledTiles());
    setMoves(0);
    setWon(false);
    setTimer(0);
  }

  function saveScore() {
    if (!playerName) return;
    const key = "leaderboard-15puzzle";
    const board = JSON.parse(localStorage.getItem(key) || "[]");

    board.push({ name: playerName, moves, time: timer, date: new Date().toISOString() });
    board.sort((a, b) => {
      if (a.moves !== b.moves) return a.moves - b.moves;
      return a.time - b.time;
    });
    localStorage.setItem(key, JSON.stringify(board.slice(0, 10)));
  }

  function moveTile(idx) {
    if (won) return;
    const emptyIdx = tiles.indexOf(0);
    const swap = (a,b) => {
      const arr = tiles.slice();
      [arr[a], arr[b]] = [arr[b], arr[a]];
      return arr;
    };
    const [row, col] = [Math.floor(idx / GRID_SIZE), idx % GRID_SIZE];
    const [emptyRow, emptyCol] = [Math.floor(emptyIdx / GRID_SIZE), emptyIdx % GRID_SIZE];

    if ((row === emptyRow && Math.abs(col - emptyCol) === 1) || (col === emptyCol && Math.abs(row - emptyRow) === 1)) {
      const newTiles = swap(idx, emptyIdx);
      setTiles(newTiles);
      setMoves(moves + 1);
      if (isSolved(newTiles)) setWon(true);
    }
  }

  const btnStyle = {
    background: "#3a5998",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "0.39rem 1.13rem",
    fontWeight: 650,
    cursor: "pointer",
    marginRight: 8,
  };

  return (
    <div>
      <div style={{display: "flex", gap: "10px", marginBottom:"15px", justifyContent: "center"}}>
        <button onClick={onBack} style={btnStyle}>Back</button>
        <button onClick={resetGame} style={btnStyle}>Reset</button>
        <button onClick={() => setShowLeaderboard(true)} style={btnStyle}>Leaderboard</button>
      </div>
      <h3>15 Puzzle</h3>
      <p>Arrange the tiles in order 1-15, empty space last.</p>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 54px)`,
        gap: "6px",
        justifyContent: "center",
        margin: "0 auto 14px auto"
      }}>
        {tiles.map((val,i) => (
          <button
            key={i}
            onClick={() => moveTile(i)}
            style={{
              width: 54,
              height: 54,
              fontSize: 22,
              fontWeight: 700,
              background: val === 0 ? "#f6f9fc" : "#e3edfa",
              border: "1.3px solid #bbb",
              borderRadius: 6,
              color: "#233261",
              cursor: val === 0 || won ? "default" : "pointer",
              opacity: val === 0 ? 0.3 : 1
            }}
            disabled={val === 0 || won}
          >
            {val !== 0 ? val : ""}
          </button>
        ))}
      </div>
      <p>Moves: {moves} | Time: {timer}s</p>
      {won && (
        <div style={{
          marginTop: 18,
          fontWeight: 700,
          color: "green",
          fontSize: "1.15rem"
        }}>🎉 You solved it! 🎉</div>
      )}

      {showLeaderboard && (
        <Leaderboard
          entries={JSON.parse(localStorage.getItem("leaderboard-15puzzle") || "[]")}
          scoreLabel="Moves / Time (s)"
          scoreKey="moves"
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </div>
  );
}
