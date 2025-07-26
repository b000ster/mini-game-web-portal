import React, { useState, useContext } from "react";
import Leaderboard from "../components/Leaderboard";
import { PlayerContext } from "../PlayerContext";

const questions = [
  { q: "What is the capital of India?", a: "Delhi" },
  { q: "React is a ___ library.", a: "JavaScript" },
  { q: "What does CSS stand for?", a: "Cascading Style Sheets" },
  { q: "2 + 2 = ?", a: "4" },
  { q: "Which planet is red?", a: "Mars" },
];

export default function QuizGame({ onBack }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { playerName } = useContext(PlayerContext);

  function resetGame() {
    setIdx(0);
    setInput("");
    setScore(0);
    setDone(false);
    setFeedback(null);
  }

  function saveScore() {
    if (!playerName) return;
    const key = "leaderboard-quiz";
    const board = JSON.parse(localStorage.getItem(key) || "[]");

    board.push({ name: playerName, score, date: new Date().toISOString() });
    board.sort((a, b) => b.score - a.score); // highest score wins
    localStorage.setItem(key, JSON.stringify(board.slice(0, 10)));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const correctAnswer = questions[idx].a.trim().toLowerCase();
    const userAnswer = input.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      setScore(s => s + 1);
      setFeedback({ correct: true, message: "Correct!" });
    } else {
      setFeedback({ correct: false, message: `Wrong! Correct answer: ${questions[idx].a}` });
    }

    if (idx === questions.length - 1) {
      setDone(true);
      saveScore();
    } else {
      setTimeout(() => {
        setIdx(i => i + 1);
        setFeedback(null);
      }, 1500);
    }
    setInput("");
  }

  const btnStyle = {
    background: "#3a5998", color: "#fff", border: "none",
    borderRadius: 6, padding: "0.39rem 1.13rem", fontWeight: 650,
    cursor: "pointer", marginRight: 8
  };

  if (done) return (
    <div>
      <div style={{display: "flex", gap: "10px", marginBottom: "15px", justifyContent: "center"}}>
        <button onClick={onBack} style={btnStyle}>Back</button>
        <button onClick={resetGame} style={btnStyle}>Reset</button>
        <button onClick={() => setShowLeaderboard(true)} style={btnStyle}>Leaderboard</button>
      </div>
      <h3>Quiz Complete!</h3>
      <p>Score: {score} / {questions.length}</p>

      {showLeaderboard && (
        <Leaderboard
          entries={JSON.parse(localStorage.getItem("leaderboard-quiz") || "[]")}
          scoreLabel="Score"
          scoreKey="score"
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </div>
  );

  return (
    <div>
      <div style={{display: "flex", gap: "10px", marginBottom: "15px", justifyContent: "center"}}>
        <button onClick={onBack} style={btnStyle}>Back</button>
        <button onClick={resetGame} style={btnStyle}>Reset</button>
        <button onClick={() => setShowLeaderboard(true)} style={btnStyle}>Leaderboard</button>
      </div>
      <h3>Quiz Game</h3>
      <p>{questions[idx].q}</p>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={e => setInput(e.target.value)} required autoComplete="off" />
        <button type="submit">Submit</button>
      </form>
      {feedback && (
        <p style={{ color: feedback.correct ? "green" : "red", fontWeight: 700, marginTop: "10px" }}>
          {feedback.message}
        </p>
      )}
    </div>
  );
}
