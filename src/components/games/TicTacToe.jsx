import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCcw } from 'react-icons/fi';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto h-full min-h-0 py-8 pb-32">
      <div className="flex w-full items-center justify-between mb-6 px-4">
        <h3 className="font-display text-2xl font-black italic tracking-tighter text-white">TIC-TAC-TOE</h3>
        <button 
          onClick={resetGame}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold font-mono text-neon-cyan transition-colors hover:bg-white/20"
        >
          <FiRefreshCcw size={12} /> RESET
        </button>
      </div>

      <div className="mb-4 flex h-8 items-center justify-center rounded-xl bg-white/5 px-6 font-mono text-sm tracking-widest text-gray-300">
        {winner ? (
          <span className="text-neon-cyan font-bold">{winner} WINS!</span>
        ) : isDraw ? (
          <span className="text-gray-400">DRAW!</span>
        ) : (
          <span>NEXT MOVE: <span className={isXNext ? 'text-neon-cyan' : 'text-purple-400'}>{isXNext ? 'X' : 'O'}</span></span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 rounded-3xl bg-black/40 border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        {board.map((value, index) => (
          <motion.button
            key={index}
            onClick={() => handleClick(index)}
            whileHover={{ scale: value || winner ? 1 : 1.05 }}
            whileTap={{ scale: value || winner ? 1 : 0.95 }}
            className={`flex h-24 w-24 items-center justify-center rounded-2xl text-5xl font-black shadow-lg transition-colors
              ${value ? 'bg-white/10 border-white/20 cursor-default' : 'bg-white/5 border-white/10 hover:bg-white/15 border cursor-pointer'} 
              ${value === 'X' ? 'text-neon-cyan [text-shadow:_0_0_15px_#06b6d4]' : ''}
              ${value === 'O' ? 'text-purple-400 [text-shadow:_0_0_15px_#c084fc]' : ''}
            `}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: value ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {value}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
