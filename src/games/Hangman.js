import React, { useState, useContext } from "react";
import Leaderboard from "../components/Leaderboard";
import { PlayerContext } from "../PlayerContext";

const words = ["REACT", "JAVASCRIPT", "HANGMAN", "COMPUTER", "PYTHON", "NODE", "PORTAL"];
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

const maxWrong = 6;

export default function Hangman({ onBack }) {
  const { playerName } = useContext(PlayerContext);
  const [target, setTarget] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  function resetGame() {
    setTarget(getRandomWord());
    setGuesses([]);
    setWrong([]);
    setWin(false);
    setLose(false);
  }

  function saveScore() {
    if (!playerName) return;
    const key = "leaderboard-hangman";
    const board = JSON.parse(localStorage.getItem(key) || "[]");

    board.push({ name: playerName, wrong: wrong.length, date: new Date().toISOString() });
    board.sort((a, b) => a.wrong - b.wrong);
    localStorage.setItem(key, JSON.stringify(board.slice(0, 10)));
  }

  function guessLetter(letter) {
    if (guesses.includes(letter) || win || lose) return;

    setGuesses(prev => [...prev, letter]);

    if (target.includes(letter)) {
      // Check win condition
      const revealed = target.split("").every(l => l === " " || guesses.includes(l) || l === letter);
      if (revealed) {
        setTimeout(() => {
          setWin(true);
          saveScore();
        }, 300);
      }
    } else {
      const newWrong = [...wrong, letter];
      setWrong(newWrong);
      if (newWrong.length >= maxWrong) {
        setTimeout(() => setLose(true), 300);
        saveScore();
      }
    }
  }

  function renderWord() {
    return (
      <div style={{ fontSize: 32, letterSpacing: 5, margin: "18px 0" }}>
        {target.split("").map((l, idx) =>
          l === " " ? " " : guesses.includes(l) || win || lose ? l : "_"
        ).join(" ")}
      </div>
    );
  }

  function renderKeyboard() {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(13, 1fr)",
        gap: 4,
        margin: "14px 0",
        maxWidth: 410,
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        {alpha.split("").map(l => (
          <button
            key={l}
            onClick={() => guessLetter(l)}
            style={{
              background: guesses.includes(l) || win || lose ? "#ccc" : "#eaf2ff",
              color: "#233261",
              border: "1px solid #abc",
              borderRadius: 4,
              padding: "6px 0",
              cursor: guesses.includes(l) || win || lose ? "default" : "pointer",
              fontWeight: 600,
              fontSize: "1rem"
            }}
            disabled={guesses.includes(l) || win || lose}
          >{l}</button>
        ))}
      </div>
    );
  }

  const btnStyle = {
    background: "#3a5998",
    color: "white",
    border: "none",
    borderRadius: 6,
    padding: "0.39rem 1.13rem",
    fontWeight: 650,
    cursor: "pointer",
    marginRight: 8
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", justifyContent: "center" }}>
        <button onClick={onBack} style={btnStyle}>Back</button>
        <button onClick={resetGame} style={btnStyle}>Reset</button>
        <button onClick={() => setShowLeaderboard(true)} style={btnStyle}>Leaderboard</button>
      </div>
      <h3>Hangman</h3>
      <div style={{ textAlign: "center" }}>
        <div>Wrong guesses: {wrong.length} / {maxWrong}</div>
        {renderWord()}
        {renderKeyboard()}
        {win && <div style={{ color: "green", fontWeight: 700, marginTop: 14 }}>You Win! 🎉</div>}
        {lose && <div style={{ color: "red", fontWeight: 700, marginTop: 14 }}>
          Game Over! The word was: <span style={{ textDecoration: "underline" }}>{target}</span>
        </div>}
      </div>
      {showLeaderboard && (
        <Leaderboard
          entries={JSON.parse(localStorage.getItem("leaderboard-hangman") || "[]")}
          scoreLabel="Wrong Guesses"
          scoreKey="wrong"
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </div>
  );
}
