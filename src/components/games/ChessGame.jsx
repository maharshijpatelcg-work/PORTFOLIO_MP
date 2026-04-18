import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCcw } from 'react-icons/fi';

// Native mapping without NPM dependencies to fix Vite install locks!
const INITIAL_BOARD = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const PIECE_UNIX = {
  'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
  'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

const ChessGame = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [selectedPos, setSelectedPos] = useState(null);
  const [turn, setTurn] = useState('w'); // 'w' (uppercase) or 'b' (lowercase)
  const [status, setStatus] = useState("Your Turn (White)");

  const isWhite = (p) => p && p === p.toUpperCase();
  const isBlack = (p) => p && p === p.toLowerCase();

  const handleSquareClick = (r, c) => {
    const piece = board[r][c];

    // Select a piece
    if (!selectedPos) {
      if (piece && ((turn === 'w' && isWhite(piece)) || (turn === 'b' && isBlack(piece)))) {
        setSelectedPos({ r, c });
      }
      return;
    }

    // Move the piece
    if (selectedPos.r === r && selectedPos.c === c) {
      setSelectedPos(null); // Deselect
      return;
    }

    // Very permissive free-move system (since we stripped out external packages)
    const newBoard = board.map(row => [...row]);
    const movingPiece = newBoard[selectedPos.r][selectedPos.c];
    
    // Check if capturing own piece
    if (piece && ((isWhite(movingPiece) && isWhite(piece)) || (isBlack(movingPiece) && isBlack(piece)))) {
      setSelectedPos({ r, c }); // Switch selection
      return;
    }

    // Execute Move
    newBoard[r][c] = movingPiece;
    newBoard[selectedPos.r][selectedPos.c] = null;
    
    setBoard(newBoard);
    setSelectedPos(null);
    setTurn(turn === 'w' ? 'b' : 'w');
    
    if (turn === 'w') {
      setStatus("Computer is thinking...");
      setTimeout(() => executeAIBot(newBoard), 1000); // 1s delay for AI
    } else {
      setStatus("Your Turn (White)");
    }
  };

  // Extremely basic native Random-Move Bot to satisfy PVE without node crashes
  const executeAIBot = (currentBoard) => {
    const blackPieces = [];
    currentBoard.forEach((row, r) => {
      row.forEach((p, c) => {
        if (isBlack(p)) blackPieces.push({r, c});
      });
    });

    if (blackPieces.length === 0) {
      setStatus("White Wins!");
      return;
    }

    // Pick a random black piece
    const start = blackPieces[Math.floor(Math.random() * blackPieces.length)];
    
    // Pick a random empty or white square near it (forward/diagonal)
    const possibleTargets = [];
    const directions = [[1, 0], [1, -1], [1, 1], [0, 1], [0, -1], [2, 0]];
    
    directions.forEach(([dr, dc]) => {
      const nr = start.r + dr;
      const nc = start.c + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        const targetP = currentBoard[nr][nc];
        if (!isBlack(targetP)) possibleTargets.push({r: nr, c: nc});
      }
    });

    if (possibleTargets.length > 0) {
      const target = possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
      const newB = currentBoard.map(row => [...row]);
      newB[target.r][target.c] = newB[start.r][start.c];
      newB[start.r][start.c] = null;
      setBoard(newB);
    }
    
    setTurn('w');
    setStatus("Your Turn (White)");
  };

  const resetGame = () => {
    setBoard(INITIAL_BOARD);
    setSelectedPos(null);
    setTurn('w');
    setStatus("Your Turn (White)");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[400px] mx-auto h-[90vh] px-2 py-4">
      <div className="flex w-full items-center justify-between mb-6 px-2">
        <h3 className="font-display text-2xl font-black italic tracking-tighter text-white">CHESS : V2</h3>
        <button 
          onClick={resetGame}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold font-mono text-neon-cyan transition-colors hover:bg-white/20"
        >
          <FiRefreshCcw size={12} /> RESET
        </button>
      </div>

      <div className="mb-4 flex h-8 items-center justify-center rounded-xl bg-white/5 px-6 font-mono text-sm tracking-widest text-gray-300">
         <span className="text-neon-cyan font-bold uppercase">{status}</span>
      </div>

      <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black/50 p-2 backdrop-blur-md">
        <div className="w-full h-full grid grid-cols-8 grid-rows-8 border border-white/20 rounded-lg overflow-hidden">
           {board.map((row, rIdx) => 
             row.map((piece, cIdx) => {
               const isDark = (rIdx + cIdx) % 2 === 1;
               const isSelected = selectedPos?.r === rIdx && selectedPos?.c === cIdx;
               return (
                 <div
                   key={`${rIdx}-${cIdx}`}
                   onClick={() => handleSquareClick(rIdx, cIdx)}
                   className={`flex items-center justify-center text-3xl sm:text-4xl cursor-pointer transition-colors select-none ${
                     isDark ? 'bg-[#1e293b]' : 'bg-[#94a3b8]'
                   } ${isSelected ? 'ring-inset ring-4 ring-neon-cyan/80 bg-neon-cyan/20' : ''}`}
                 >
                   {piece && (
                     <motion.span
                       initial={{ scale: 0.8 }}
                       animate={{ scale: 1 }}
                       whileHover={{ scale: 1.1 }}
                       className={`${isWhite(piece) ? 'text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]' : 'text-gray-900 drop-shadow-[0_2px_5px_rgba(255,255,255,0.2)]'}`}
                     >
                       {PIECE_UNIX[piece]}
                     </motion.span>
                   )}
                 </div>
               );
             })
           )}
        </div>
      </div>
      
      <p className="mt-8 text-xs font-mono text-gray-400 text-center px-4 bg-black/40 py-3 rounded-xl border border-white/10">
        NPM Package Free Version: This custom board utilizes Sandbox Movement geometry to bypass Windows terminal installation freezes. Click to move anywhere!
      </p>
    </div>
  );
};

export default ChessGame;
