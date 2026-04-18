import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlayCircle, FiRefreshCw } from 'react-icons/fi';

// Define board colors for the premium aesthetic
const COLORS = {
  red: '#ef4444',
  green: '#10b981',
  yellow: '#eab308',
  blue: '#3b82f6',
};

// Start offsets on the 52-tile track
const START_OFFSETS = { red: 0, green: 13, yellow: 26, blue: 39 };

const LudoGame = () => {
  const [turn, setTurn] = useState('red');
  const [dice, setDice] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [logs, setLogs] = useState(["Game started. Red's turn."]);
  
  // Tokens state: [ { id, color, relativePos } ] relativePos = -1 (home), 0-50 (track), 51-56 (home stretch)
  const [tokens, setTokens] = useState([
    { id: 'r1', color: 'red', pos: -1 }, { id: 'r2', color: 'red', pos: -1 }, { id: 'r3', color: 'red', pos: -1 }, { id: 'r4', color: 'red', pos: -1 },
    { id: 'g1', color: 'green', pos: -1 }, { id: 'g2', color: 'green', pos: -1 }, { id: 'g3', color: 'green', pos: -1 }, { id: 'g4', color: 'green', pos: -1 },
    { id: 'y1', color: 'yellow', pos: -1 }, { id: 'y2', color: 'yellow', pos: -1 }, { id: 'y3', color: 'yellow', pos: -1 }, { id: 'y4', color: 'yellow', pos: -1 },
    { id: 'b1', color: 'blue', pos: -1 }, { id: 'b2', color: 'blue', pos: -1 }, { id: 'b3', color: 'blue', pos: -1 }, { id: 'b4', color: 'blue', pos: -1 },
  ]);

  const NEXT_TURN = { red: 'green', green: 'yellow', yellow: 'blue', blue: 'red' };

  const addLog = (msg) => setLogs(prev => [msg, ...prev].slice(0, 4));

  const rollDice = () => {
    if (isRolling || dice !== null) return;
    setIsRolling(true);
    
    // Animate dice roll
    setTimeout(() => {
      const val = Math.floor(Math.random() * 6) + 1;
      setDice(val);
      setIsRolling(false);
      addLog(`${turn.toUpperCase()} rolled a ${val}`);
      
      // Auto-skip if stuck (no tokens out and didn't roll 6)
      const playerTokens = tokens.filter(t => t.color === turn);
      const allHome = playerTokens.every(t => t.pos === -1);
      if (allHome && val !== 6) {
        setTimeout(() => {
          setTurn(NEXT_TURN[turn]);
          setDice(null);
          addLog(`${NEXT_TURN[turn].toUpperCase()}'s turn`);
        }, 1500);
      }
    }, 600);
  };

  const handleTokenClick = (tokenId) => {
    if (dice === null) return;
    const token = tokens.find(t => t.id === tokenId);
    if (token.color !== turn) return; // Not your turn

    let newTokens = [...tokens];
    let tkIndex = newTokens.findIndex(t => t.id === tokenId);
    let tk = newTokens[tkIndex];

    // Spawning rule
    if (tk.pos === -1) {
      if (dice === 6) {
        tk.pos = 0; // Spawn onto the track
        setTokens(newTokens);
        setDice(null); 
        // Rule: rolling 6 gives another turn, so don't change `turn`
        addLog(`${turn.toUpperCase()} spawned a token! Roll again.`);
        return;
      } else {
        return; // Invalid move
      }
    }

    // Move token forward
    let nextPos = tk.pos + dice;
    if (nextPos > 56) return; // Cannot over-jump the goal
    tk.pos = nextPos;

    // Check for "cutting" mechanics (simplified: check global track pos overlap)
    if (nextPos <= 50) {
      const globalPos = (nextPos + START_OFFSETS[turn]) % 52;
      newTokens.forEach((otherTk, i) => {
        if (otherTk.color !== turn && otherTk.pos >= 0 && otherTk.pos <= 50) {
          const otherGlobal = (otherTk.pos + START_OFFSETS[otherTk.color]) % 52;
          if (globalPos === otherGlobal) {
            // Cut!
            newTokens[i].pos = -1;
            addLog(`${turn.toUpperCase()} cut a ${otherTk.color} token!`);
          }
        }
      });
    }

    setTokens(newTokens);
    setDice(null);
    if (dice !== 6) {
      setTurn(NEXT_TURN[turn]);
      addLog(`${NEXT_TURN[turn].toUpperCase()}'s turn`);
    } else {
      addLog(`${turn.toUpperCase()} gets another roll!`);
    }
  };

  // Maps a token's relative position (0-56) to physical 15x15 board coords (0-14, 0-14)
  const getGridPosition = (color, pos, indexInBase) => {
    if (pos === -1) {
      // Base positions
      const bx = color === 'red' || color === 'green' ? 2 : 11;
      const by = color === 'green' || color === 'yellow' ? 2 : 11;
      const offsets = [[0,0], [1,0], [0,1], [1,1]];
      return { col: bx + offsets[indexInBase][0], row: by + offsets[indexInBase][1] };
    }

    // The universal circular track geometry on a 15x15 Ludo board array mapping 0->51
    const TRACK = [
      [1,6],[2,6],[3,6],[4,6],[5,6], // Red path approach
      [6,5],[6,4],[6,3],[6,2],[6,1],[6,0], // Up Green path
      [7,0],[8,0], // Top bridge
      [8,1],[8,2],[8,3],[8,4],[8,5], // Down Green path
      [9,6],[10,6],[11,6],[12,6],[13,6],[14,6], // Right Yellow path
      [14,7],[14,8], // Right bridge
      [13,8],[12,8],[11,8],[10,8],[9,8], // Left Yellow path
      [8,9],[8,10],[8,11],[8,12],[8,13],[8,14], // Down Blue path
      [7,14],[6,14], // Bottom bridge
      [6,13],[6,12],[6,11],[6,10],[6,9], // Up Blue path
      [5,8],[4,8],[3,8],[2,8],[1,8],[0,8], // Left Red path
      [0,7] // Left bridge
    ];

    if (pos <= 50) {
      const globalPos = (pos + START_OFFSETS[color]) % 52;
      return { col: TRACK[globalPos][0], row: TRACK[globalPos][1] };
    }

    // Home Stretches (51 - 56)
    const stretch = pos - 50; // 1 to 6
    if (color === 'red') return { col: stretch, row: 7 };
    if (color === 'green') return { col: 7, row: stretch };
    if (color === 'yellow') return { col: 14 - stretch, row: 7 };
    if (color === 'blue') return { col: 7, row: 14 - stretch };
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto h-full max-h-[90vh] overflow-hidden p-2">
      <div className="flex w-full items-center justify-between mb-4 px-2">
        <h3 className="font-display text-2xl font-black italic tracking-tighter text-white">LUDO ARENA</h3>
        <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold font-mono text-neon-cyan transition-colors hover:bg-white/20" onClick={() => window.location.reload()}>
           RESET
        </button>
      </div>

      <div className="flex w-full flex-col md:flex-row gap-6">
        
        {/* LUDO BOARD SCALER */}
        <div className="relative aspect-square w-full md:w-[400px] flex-shrink-0 bg-white/5 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden p-2 backdrop-blur-md">
           {/* Visual Grid CSS drawing */}
           <div className="w-full h-full relative" style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gridTemplateRows: 'repeat(15, 1fr)' }}>
              
              {/* Bases */}
              <div className="col-start-1 col-end-7 row-start-1 row-end-7 border-2 rounded-xl" style={{ borderColor: COLORS.green, backgroundColor: `${COLORS.green}33` }} />
              <div className="col-start-10 col-end-16 row-start-1 row-end-7 border-2 rounded-xl" style={{ borderColor: COLORS.yellow, backgroundColor: `${COLORS.yellow}33` }} />
              <div className="col-start-1 col-end-7 row-start-10 row-end-16 border-2 rounded-xl" style={{ borderColor: COLORS.red, backgroundColor: `${COLORS.red}33` }} />
              <div className="col-start-10 col-end-16 row-start-10 row-end-16 border-2 rounded-xl" style={{ borderColor: COLORS.blue, backgroundColor: `${COLORS.blue}33` }} />
              
              {/* Home Square Cross */}
              <div className="col-start-7 col-end-10 row-start-7 row-end-10 bg-white/10" />

              {/* Tokens physically mapped */}
              {tokens.map((tk, idx) => {
                 let idBaseList = tokens.filter(t => t.color === tk.color && t.pos === -1);
                 let posInBase = tk.pos === -1 ? idBaseList.findIndex(t => t.id === tk.id) : 0;
                 
                 const { col, row } = getGridPosition(tk.color, tk.pos, posInBase);
                 
                 return (
                   <motion.div
                     key={tk.id}
                     layout
                     onClick={() => handleTokenClick(tk.id)}
                     animate={{ 
                       gridColumnStart: col + 1, 
                       gridRowStart: row + 1, 
                       scale: tk.color === turn && dice !== null ? [1, 1.2, 1] : 1
                     }}
                     transition={{ duration: 0.3, scale: { repeat: tk.color === turn && dice !== null ? Infinity : 0, duration: 1 } }}
                     className={`flex items-center justify-center m-1 rounded-full border-2 border-black shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-pointer z-10 ${tk.pos === 57 ? 'opacity-50' : 'opacity-100'}`}
                     style={{ backgroundColor: COLORS[tk.color] }}
                   >
                      {tk.pos === 57 && <span className="text-[8px]">★</span>}
                   </motion.div>
                 );
              })}
           </div>
        </div>

        {/* CONTROLS */}
        <div className="flex-1 flex flex-col justify-center items-center p-4 bg-black/40 border border-white/10 rounded-2xl">
           <h4 className="font-mono text-lg font-bold mb-4 uppercase" style={{ color: COLORS[turn], textShadow: `0 0 10px ${COLORS[turn]}` }}>
             {turn}'s Turn
           </h4>
           
           <motion.button
             onClick={rollDice}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             disabled={dice !== null || isRolling}
             className="flex flex-col items-center justify-center h-24 w-24 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
           >
             {isRolling ? (
               <FiRefreshCw className="animate-spin text-white" size={32} />
             ) : dice !== null ? (
               <span className="text-4xl font-black text-white">{dice}</span>
             ) : (
               <FiPlayCircle className="text-neon-cyan" size={32} />
             )}
           </motion.button>

           {dice !== null && (
             <p className="mt-4 text-xs font-mono text-gray-400 animate-pulse text-center">
               Select a <span style={{color: COLORS[turn]}}>{turn}</span> token<br/>to move {dice} spaces.
             </p>
           )}

           <div className="mt-8 w-full max-h-32 overflow-y-auto rounded-lg bg-black/60 p-3 border border-white/10 text-xs font-mono scrollbar-thin scrollbar-thumb-white/10">
              {logs.map((log, i) => (
                <div key={i} className={`py-1 ${i===0 ? 'text-white font-bold' : 'text-gray-500'}`}>
                  {`> ${log}`}
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default LudoGame;
