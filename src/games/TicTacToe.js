import React, { useState, useEffect, useContext, useCallback } from "react";
import { PlayerContext } from "../PlayerContext";
import Leaderboard from "../components/Leaderboard";

const sharedBtnStyle = {
  background: "#3a5998",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.39rem 1.13rem",
  fontWeight: 650,
  cursor: "pointer",
  marginRight: 8,
};

const winnerLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function calcWinner(squares) {
  for (const [a, b, c] of winnerLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return [null, []];
}

function getRandomMove(squares) {
  const empty = squares.map((val, idx) => (val ? null : idx)).filter(idx => idx !== null);
  if (empty.length === 0) return null;
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function TicTacToe({ onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { playerName } = useContext(PlayerContext);

  // UseCallback so saveScore is stable for useEffect dependencies
  const saveScore = useCallback((winnerSide, moveCount) => {
    if (!playerName) return;
    const key = "leaderboard-tictactoe";
    const boardScores = JSON.parse(localStorage.getItem(key) || "[]");

    const scoreEntry = {
      name: playerName,
      winner: winnerSide,
      moves: moveCount,
      date: new Date().toISOString()
    };
    boardScores.push(scoreEntry);
    boardScores.sort((a, b) => {
      if (a.winner === "Player" && b.winner !== "Player") return -1;
      if (a.winner !== "Player" && b.winner === "Player") return 1;
      if (a.winner === b.winner) return a.moves - b.moves;
      return 0;
    });
    localStorage.setItem(key, JSON.stringify(boardScores.slice(0, 10)));
  }, [playerName]);

  // Computer move effect — add moves and saveScore to dependencies
  useEffect(() => {
    if (!isPlayerTurn && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const move = getRandomMove(board);
        if (move !== null) {
          const newBoard = [...board];
          newBoard[move] = "O";
          const [win, line] = calcWinner(newBoard);
          setBoard(newBoard);
          setMoves(m => m + 1);
          if (win) {
            setWinner(win);
            setWinningLine(line);
            saveScore(win === "X" ? "Player" : "Computer", moves + 1);
          } else if (!newBoard.includes(null)) {
            setIsDraw(true);
            saveScore("Draw", moves + 1);
          } else {
            setIsPlayerTurn(true);
          }
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, winner, isDraw, board, moves, saveScore]);

  function playerMove(i) {
    if (!isPlayerTurn || winner || board[i]) return;
    const next = board.slice();
    next[i] = "X";
    const [win, line] = calcWinner(next);
    setBoard(next);
    setMoves(m => m + 1);
    if (win) {
      setWinner(win);
      setWinningLine(line);
      saveScore("Player", moves + 1);
    } else if (!next.includes(null)) {
      setIsDraw(true);
      saveScore("Draw", moves + 1);
    } else {
      setIsPlayerTurn(false);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine([]);
    setIsDraw(false);
    setMoves(0);
  }

  function renderSquare(i) {
    const isWinning = winningLine.includes(i);
    return (
      <button
        key={i}
        onClick={() => playerMove(i)}
        style={{
          width: 60,
          height: 60,
          fontSize: 28,
          fontWeight: "bold",
          color: isWinning ? "#3a5998" : "#222",
          background: isWinning ? "#bbdefb" : "#e0e0e0",
          border: "1px solid #999",
          cursor: winner || board[i] || !isPlayerTurn ? "default" : "pointer",
        }}
        aria-label={`Square ${i + 1}`}
      >
        {board[i]}
      </button>
    );
  }

  let status;
  if (winner) {
    status = winner === "X" ? "You win!" : "Computer wins!";
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = isPlayerTurn ? "Your turn (X)" : "Computer's turn (O)…";
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
          justifyContent: "center",
        }}
      >
        <button onClick={onBack} style={sharedBtnStyle}>Back</button>
        <button onClick={resetGame} style={sharedBtnStyle}>Reset</button>
        <button onClick={() => setShowLeaderboard(true)} style={sharedBtnStyle}>Leaderboard</button>
      </div>
      <h3>Tic-Tac-Toe (vs Computer)</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 60px)",
          gap: "6px",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        {board.map((_, i) => renderSquare(i))}
      </div>
      <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>{status}</p>
      {showLeaderboard && (
        <Leaderboard
          entries={JSON.parse(localStorage.getItem("leaderboard-tictactoe") || "[]")}
          scoreLabel="Winner / Moves"
          scoreKey="moves"
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </div>
  );
}

