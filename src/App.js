import React, { useState } from "react";
import "./App.css";
import GameCard from "./components/GameCard";
import GamePlayer from "./components/GamePlayer";
import { PlayerProvider } from "./PlayerContext";
import { PlayerNameModal } from "./components/PlayerNameModal";

const games = [
  { id: 1, title: "Memory Game", description: "Match pairs as fast as you can!", component: "MemoryGame", image: "memory.png" },
  { id: 2, title: "Quiz Game", description: "Test your knowledge with simple questions!", component: "QuizGame", image: "quiz.png" },
  { id: 3, title: "Tic-Tac-Toe", description: "Classic 3x3 grid game vs computer!", component: "TicTacToe", image: "tictactoe.png" },
  { id: 4, title: "Hangman", description: "Guess letters to discover the word. 6 wrong guesses allowed!", component: "Hangman", image: "hangman.png" },
  { id: 5, title: "15 Puzzle", description: "Slide numbered tiles into order. Try for lowest moves!", component: "FifteenPuzzle", image: "15puzzle.png" },
];

function App() {
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <PlayerProvider>
      <PlayerNameModal />

      <div className="App">
        <header><h1>Mini-Game Portal</h1></header>
        <main>
          {!currentGame ? (
            <div className="games-list">
              {games.map(game => (
                <GameCard key={game.id} title={game.title} description={game.description} image={game.image} onPlay={() => setCurrentGame(game.component)} />
              ))}
            </div>
          ) : (
            <GamePlayer component={currentGame} onBack={() => setCurrentGame(null)} />
          )}
        </main>
        <footer><p>© Vemula Sai Vikas 2025 | Fresher Mini-Game Project</p></footer>
      </div>
    </PlayerProvider>
  );
}

export default App;
