import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCcw, FiCpu } from 'react-icons/fi';

const PIECE_UNIX = {
  'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
  'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

const ChessGame = () => {
  const [engineLoaded, setEngineLoaded] = useState(false);
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState([]);
  const [selectedPos, setSelectedPos] = useState(null); 
  const [possibleMoves, setPossibleMoves] = useState([]); 
  const [status, setStatus] = useState("Loading verified engine...");
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Initialize actual chess.js algorithm algorithmically via CDN bypass
  useEffect(() => {
    let active = true;
    const initEngine = async () => {
       try {
         const mod = await import('https://cdn.jsdelivr.net/npm/chess.js@1.0.0-beta.8/+esm');
         if (!active) return;
         const chessObj = new mod.Chess();
         setGame(chessObj);
         setBoard(chessObj.board());
         setEngineLoaded(true);
         setStatus("Your Turn (White)");
       } catch (err) {
         setStatus("Error loading local engine logic.");
       }
    };
    initEngine();
    return () => { active = false; };
  }, []);

  const evaluateBoard = (chess) => {
    const pieceValues = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 900 };
    let total = 0;
    const b = chess.board();
    for(let r=0; r<8; r++){
      for(let c=0; c<8; c++){
         const p = b[r][c];
         if (p) total += p.color === 'w' ? pieceValues[p.type] : -pieceValues[p.type];
      }
    }
    return total;
  };

  const executeAIBot = (chessObj) => {
    if (chessObj.isGameOver()) return;
    const moves = chessObj.moves({ verbose: true });
    if (moves.length === 0) return;

    let bestMove = null;
    let bestValue = Infinity; // Black wants strongly negative evaluation

    moves.forEach(m => {
       chessObj.move(m);
       let v = evaluateBoard(chessObj);
       // Add flutter to randomize equal trades
       v += (Math.random()*2 - 1);
       if (v < bestValue) {
          bestValue = v;
          bestMove = m;
       }
       chessObj.undo();
    });

    const move = bestMove || moves[Math.floor(Math.random() * moves.length)];
    chessObj.move(move);
    setGame(chessObj); // React state update
    setBoard(chessObj.board());
    updateGameStatus(chessObj);
    setIsAiThinking(false);
  };

  const updateGameStatus = (chessObj) => {
    if (chessObj.isCheckmate()) setStatus(`Checkmate! ${chessObj.turn() === 'w' ? 'Black' : 'White'} wins.`);
    else if (chessObj.isDraw()) setStatus("Draw!");
    else if (chessObj.isCheck()) setStatus("Check!");
    else setStatus(chessObj.turn() === 'w' ? "Your Turn (White)" : "Computer Turn (Black)");
  };

  const getSquareCoord = (r, c) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return `${files[c]}${8 - r}`;
  };

  const handleSquareClick = (r, c) => {
    if (!game || isAiThinking || game.isGameOver() || game.turn() !== 'w') return;
    
    const square = getSquareCoord(r, c);
    
    if (selectedPos && selectedPos === square) {
       setSelectedPos(null);
       setPossibleMoves([]);
       return;
    }

    if (selectedPos) {
       try {
         const m = game.move({ from: selectedPos, to: square, promotion: 'q' });
         if (m) {
            setBoard(game.board());
            setSelectedPos(null);
            setPossibleMoves([]);
            updateGameStatus(game);
            
            if (!game.isGameOver()) {
               setIsAiThinking(true);
               setStatus("Computer is thinking...");
               setTimeout(() => executeAIBot(game), 600);
            }
            return;
         }
       } catch (e) {
          // Fall back gracefully if move string throws exception
       }
    }

    // Setup Target Matrix Highlights
    try {
      const moves = game.moves({ square, verbose: true });
      if (moves.length > 0) {
         setSelectedPos(square);
         setPossibleMoves(moves.map(m => m.to));
      } else {
         setSelectedPos(null);
         setPossibleMoves([]);
      }
    } catch(e) {}
  };

  const resetGame = () => {
     if (game) {
        game.reset();
        setBoard(game.board());
        setSelectedPos(null);
        setPossibleMoves([]);
        setStatus("Your Turn (White)");
        setIsAiThinking(false);
     }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[440px] mx-auto h-full min-h-0 px-2 sm:px-4 py-8 pb-32 overflow-y-auto overflow-x-hidden scrollbar-none">
      <div className="flex w-full items-center justify-between mb-6 px-2">
        <h3 className="font-display text-2xl font-black italic tracking-tighter text-white">CHESS : V3 AI</h3>
        {engineLoaded && (
          <button 
            onClick={resetGame}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold font-mono text-neon-cyan transition-colors hover:bg-white/20"
          >
            <FiRefreshCcw size={12} /> RESET
          </button>
        )}
      </div>

      <div className="mb-4 flex h-8 items-center justify-center rounded-xl bg-white/5 px-6 font-mono text-sm tracking-widest text-gray-300">
         {!engineLoaded ? (
            <span className="text-gray-400 font-bold uppercase animate-pulse">{status}</span>
         ) : status.includes('mate') || status.includes('Check') ? (
            <span className="text-red-500 font-bold uppercase animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">{status}</span>
         ) : (
            <span className="text-neon-cyan font-bold uppercase">{status}</span>
         )}
      </div>

      <div className="w-full sm:w-[95%] aspect-square rounded-xl overflow-hidden border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black/50 p-2 backdrop-blur-md relative mx-auto">
        <div className="w-full h-full grid grid-cols-8 grid-rows-8 border border-white/20 rounded-lg overflow-hidden">
           {engineLoaded ? board.map((row, rIdx) => 
             row.map((pieceObj, cIdx) => {
               const square = getSquareCoord(rIdx, cIdx);
               const isDark = (rIdx + cIdx) % 2 === 1;
               const isSelected = selectedPos === square;
               const isTarget = possibleMoves.includes(square);
               
               return (
                 <div
                   key={`${rIdx}-${cIdx}`}
                   onClick={() => handleSquareClick(rIdx, cIdx)}
                   className={`relative flex items-center justify-center text-3xl sm:text-4xl cursor-pointer transition-colors select-none ${
                     isDark ? 'bg-[#1e293b]' : 'bg-[#94a3b8]'
                   } ${isSelected ? 'ring-inset ring-[4px] ring-neon-cyan/80 bg-[#0ea5e9]' : ''}`}
                 >
                   {isTarget && (
                      <div className="absolute w-3 h-3 rounded-full bg-neon-cyan/50 drop-shadow-[0_0_5px_rgba(6,182,212,1)]" />
                   )}
                   {pieceObj && (
                     <motion.span
                       initial={{ scale: 0.8 }}
                       animate={{ scale: 1 }}
                       className={`${pieceObj.color === 'w' ? 'text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]' : 'text-gray-900 drop-shadow-[0_2px_5px_rgba(255,255,255,0.2)]'}`}
                       style={{ zIndex: 10 }}
                     >
                       {pieceObj.color === 'w' ? PIECE_UNIX[pieceObj.type.toUpperCase()] : PIECE_UNIX[pieceObj.type]}
                     </motion.span>
                   )}
                 </div>
               );
             })
           ) : (
              <div className="col-span-8 row-span-8 flex flex-col items-center justify-center bg-black/80">
                 <FiCpu size={32} className="text-neon-cyan mb-4 animate-spin-slow" />
                 <p className="font-mono text-neon-cyan/50 text-xs">AWAITING ENGINE LINK...</p>
              </div>
           )}
        </div>
      </div>
      
      <p className="mt-8 text-xs font-mono text-gray-400 text-center px-4 bg-black/40 py-3 rounded-xl border border-white/10">
        Connected to genuine ESM Validation algorithms. Features Castling, Checking, and En Passant natively via serverless runtime hooks.
      </p>
    </div>
  );
};

export default ChessGame;
