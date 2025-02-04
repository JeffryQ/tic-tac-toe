import { useState } from "react";
import confetti from "canvas-confetti";
const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  return (
    <div onClick={() => updateBoard(index)} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo; // Corregido aquí
      if (
        boardCheck[a] &&
        boardCheck[a] === boardCheck[b] &&
        boardCheck[a] === boardCheck[c]
      ) {
        return boardCheck[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((Square) => Square !== null);
  };

  const updateBoard = (index) => {
    // Si el cuadrado ya está ocupado, no hacer nada
    if (board[index] || winner) return;

    // Crear una copia del tablero
    const newBoard = [...board];
    // Asignar el turno actual (X o O) al cuadrado seleccionado
    newBoard[index] = turn;
    // Actualizar el estado del tablero
    setBoard(newBoard);
    // Cambiar el turno al otro jugador
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              isSelected={false}
            >
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X} updateBoard={() => {}}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O} updateBoard={() => {}}>
          {TURNS.O}
        </Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "empate" : "ganó " + winner}</h2>
            <header>{winner && <Square> {winner} </Square>}</header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
