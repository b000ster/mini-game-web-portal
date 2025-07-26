import React from "react";
import MemoryGame from "../games/MemoryGame";
import QuizGame from "../games/QuizGame";
import TicTacToe from "../games/TicTacToe";
import Hangman from "../games/Hangman";
import FifteenPuzzle from "../games/FifteenPuzzle";

export default function GamePlayer({ component, onBack }) {
  return (
    <>
      {component === "MemoryGame" && <MemoryGame onBack={onBack} />}
      {component === "QuizGame" && <QuizGame onBack={onBack} />}
      {component === "TicTacToe" && <TicTacToe onBack={onBack} />}
      {component === "Hangman" && <Hangman onBack={onBack} />}
      {component === "FifteenPuzzle" && <FifteenPuzzle onBack={onBack} />}
    </>
  );
}
