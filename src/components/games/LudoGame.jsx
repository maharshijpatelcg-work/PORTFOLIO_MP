import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlayCircle, FiRefreshCw } from 'react-icons/fi';

const COLORS = {
  red: '#ef4444',
  green: '#10b981',
  yellow: '#eab308',
  blue: '#3b82f6',
};

const START_OFFSETS = { red: 26, green: 0, yellow: 13, blue: 39 };

// Relative Path:
// -1 = Base
// 0-50 = Outer Circular Track
// 51-56 = Inside Home Column Stretching to Center (57)

// Absolute global physical mapping array for rendering exactly on a 15x15 pixelated layout
// Standard Ludo Path (Top-Left is 0,0)
const TRACK = [
  // Green starts at index 0 (row 6, col 1) -> moves right
  [1,6],[2,6],[3,6],[4,6],[5,6], // 0-4
  [6,5],[6,4],[6,3],[6,2],[6,1],[6,0], // 5-10
  [7,0],[8,0], // 11-12
  // Yellow starts at 13 (row 1, col 8) -> moves down
  [8,1],[8,2],[8,3],[8,4],[8,5], // 13-17
  [9,6],[10,6],[11,6],[12,6],[13,6],[14,6], // 18-23
  [14,7],[14,8], // 24-25
  // Red/Blue symmetric continuations:
  [13,8],[12,8],[11,8],[10,8],[9,8], // 26-30
  [8,9],[8,10],[8,11],[8,12],[8,13],[8,14], // 31-36
  [7,14],[6,14], // 37-38
  [6,13],[6,12],[6,11],[6,10],[6,9], // 39-43
  [5,8],[4,8],[3,8],[2,8],[1,8],[0,8], // 44-49
  [0,7] // 50-51 bridge connecting back
];

const SAFE_SPOTS = [
  0, 8, // Green spawn, Star
  13, 21, // Yellow spawn, Star
  26, 34, // Red spawn, Star 
  39, 47  // Blue spawn, Star
];

const LudoGame = () => {
  const [turn, setTurn] = useState('green');
  const [dice, setDice] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [logs, setLogs] = useState(["Match initialized. Green starts."]);
  
  const [tokens, setTokens] = useState([
    { id: 'g1', color: 'green', pos: -1 }, { id: 'g2', color: 'green', pos: -1 }, { id: 'g3', color: 'green', pos: -1 }, { id: 'g4', color: 'green', pos: -1 },
    { id: 'y1', color: 'yellow', pos: -1 }, { id: 'y2', color: 'yellow', pos: -1 }, { id: 'y3', color: 'yellow', pos: -1 }, { id: 'y4', color: 'yellow', pos: -1 },
    { id: 'r1', color: 'red', pos: -1 }, { id: 'r2', color: 'red', pos: -1 }, { id: 'r3', color: 'red', pos: -1 }, { id: 'r4', color: 'red', pos: -1 },
    { id: 'b1', color: 'blue', pos: -1 }, { id: 'b2', color: 'blue', pos: -1 }, { id: 'b3', color: 'blue', pos: -1 }, { id: 'b4', color: 'blue', pos: -1 },
  ]);

  const NEXT_TURN = { green: 'yellow', yellow: 'red', red: 'blue', blue: 'green' };

  const addLog = (msg) => setLogs(prev => [msg, ...prev].slice(0, 4));

  const rollDice = () => {
    if (isRolling || dice !== null) return;
    setIsRolling(true);
    
    setTimeout(() => {
      const val = Math.floor(Math.random() * 6) + 1;
      setDice(val);
      setIsRolling(false);
      addLog(`${turn.toUpperCase()} rolled a ${val}`);
      
      const playerTokens = tokens.filter(t => t.color === turn);
      const activeTokens = playerTokens.filter(t => t.pos >= 0 && t.pos < 57);
      
      if (activeTokens.length === 0 && val !== 6) {
        setTimeout(() => {
          setTurn(NEXT_TURN[turn]);
          setDice(null);
          addLog(`Skipped! Need 6 to unlock.`);
        }, 1000);
      }
    }, 500);
  };

  const attemptMove = (tokenId) => {
    if (dice === null) return;
    const token = tokens.find(t => t.id === tokenId);
    if (token.color !== turn) return; 

    let newTokens = [...tokens];
    let tk = newTokens.find(t => t.id === tokenId);

    let grantExtraTurn = false;

    // Spawning Logic (Needs 6)
    if (tk.pos === -1) {
      if (dice === 6) {
        tk.pos = 0; 
        grantExtraTurn = true;
        addLog(`Token Deployed! Roll again.`);
      } else {
        return; // Invalid, can't move
      }
    } else {
      // Movement Logic
      let nextPos = tk.pos + dice;
      if (nextPos > 57) return; // Must roll exact to enter final base
      if (nextPos === 57) {
         grantExtraTurn = true;
         addLog(`${turn.toUpperCase()} reached HOME! Extra roll!`);
      }
      
      tk.pos = nextPos;

      // Cutting Physics
      if (nextPos <= 50) {
        const myGlobalPos = (nextPos + START_OFFSETS[turn]) % 52;
        if (!SAFE_SPOTS.includes(myGlobalPos)) {
           newTokens.forEach((other, j) => {
             if (other.color !== turn && other.pos >= 0 && other.pos <= 50) {
               const otherGlobalPos = (other.pos + START_OFFSETS[other.color]) % 52;
               if (myGlobalPos === otherGlobalPos) {
                 other.pos = -1; // Cut!
                 grantExtraTurn = true;
                 addLog(`CUT! Sent ${other.color} back!`);
               }
             }
           });
        }
      }
    }

    setTokens(newTokens);
    setDice(null);
    if (dice === 6) grantExtraTurn = true;

    if (!grantExtraTurn) {
      setTurn(NEXT_TURN[turn]);
    }
  };

  const getGridPosition = (color, pos, idIndex) => {
    if (pos === -1) {
      const bx = color === 'green' || color === 'red' ? 2 : 11;
      const by = color === 'green' || color === 'yellow' ? 2 : 11;
      const off = [[0,0], [1,0], [0,1], [1,1]];
      return { col: bx + off[idIndex][0], row: by + off[idIndex][1] };
    }

    if (pos === 57) {
       return { col: 7, row: 7 }; // Central Home
    }

    if (pos <= 50) {
      const globalPos = (pos + START_OFFSETS[color]) % 52;
      return { col: TRACK[globalPos][0], row: TRACK[globalPos][1] };
    }

    // Home Stretches (51-56)
    const stretch = pos - 50; 
    if (color === 'green')  return { col: stretch, row: 7 };
    if (color === 'yellow') return { col: 7, row: stretch };
    if (color === 'blue')   return { col: 7, row: 14 - stretch };
    if (color === 'red')    return { col: 14 - stretch, row: 7 };
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[800px] mx-auto h-full min-h-0 px-2 py-8 sm:py-4 pb-24">
      <div className="flex w-full items-center justify-between mb-4">
        <h3 className="font-display text-2xl font-black italic tracking-tighter text-white">LUDO ARENA</h3>
      </div>

      <div className="flex flex-col w-full h-auto min-h-0 md:h-full md:flex-row gap-6 pb-20">
        
        {/* EXACT LUDO GRID SCALER */}
        <div className="relative aspect-square w-full sm:w-[80%] md:w-[500px] mx-auto flex-shrink-0 bg-white/5 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden p-2 backdrop-blur-md">
           
           {/* SVG Path Underlays for pristine visuals */}
           <svg viewBox="0 0 15 15" className="absolute inset-0 w-full h-full z-0 p-2 opacity-50">
             {/* Center */}
             <polygon points="7.5,7.5 6,6 9,6" fill={COLORS.yellow} />
             <polygon points="7.5,7.5 9,6 9,9" fill={COLORS.blue} />
             <polygon points="7.5,7.5 9,9 6,9" fill={COLORS.red} />
             <polygon points="7.5,7.5 6,9 6,6" fill={COLORS.green} />
           </svg>

           <div className="w-full h-full relative z-10" style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gridTemplateRows: 'repeat(15, 1fr)' }}>
              
              {/* Bases Grid Definition */}
              <div className="col-start-1 col-end-7 row-start-1 row-end-7 border-[3px] rounded-xl flex items-center justify-center bg-[#10b98133] shadow-[inset_0_0_20px_#10b98166]" style={{ borderColor: COLORS.green }} />
              <div className="col-start-10 col-end-16 row-start-1 row-end-7 border-[3px] rounded-xl flex items-center justify-center bg-[#eab30833] shadow-[inset_0_0_20px_#eab30866]" style={{ borderColor: COLORS.yellow }} />
              <div className="col-start-1 col-end-7 row-start-10 row-end-16 border-[3px] rounded-xl flex items-center justify-center bg-[#ef444433] shadow-[inset_0_0_20px_#ef444466]" style={{ borderColor: COLORS.red }} />
              <div className="col-start-10 col-end-16 row-start-10 row-end-16 border-[3px] rounded-xl flex items-center justify-center bg-[#3b82f633] shadow-[inset_0_0_20px_#3b82f666]" style={{ borderColor: COLORS.blue }} />
              
              {/* Token Mappings */}
              {tokens.map((tk, idx) => {
                 let posInBase = 0;
                 if (tk.pos === -1) {
                   const baseGroup = tokens.filter(t => t.color === tk.color && t.pos === -1);
                   posInBase = baseGroup.findIndex(t => t.id === tk.id);
                 }
                 
                 const { col, row } = getGridPosition(tk.color, tk.pos, posInBase);
                 
                 // Detect stacked tokens on the same global track cell
                 const stackedTokens = tokens.filter(t => t.pos > 0 && t.pos <= 50 && getGridPosition(t.color, t.pos, 0).col === col && getGridPosition(t.color, t.pos, 0).row === row);
                 const scaleX = stackedTokens.length > 1 ? 0.7 : 1; 
                 const offsetX = stackedTokens.length > 1 ? (stackedTokens.findIndex(x => x.id === tk.id) * 4) - 4 : 0;

                 return (
                   <motion.div
                     key={tk.id}
                     layout
                     onClick={() => attemptMove(tk.id)}
                     className={`flex items-center justify-center m-[2px] rounded-full border-2 shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-pointer z-50 ${tk.pos === 57 ? 'opacity-20' : 'opacity-100'}`}
                     style={{ 
                       gridColumnStart: col + 1, 
                       gridRowStart: row + 1,
                       backgroundColor: COLORS[tk.color],
                       borderColor: tk.color === turn && dice ? '#fff' : '#000',
                       transform: `translateX(${offsetX}px) scale(${scaleX})`
                     }}
                     whileHover={{ scale: tk.color === turn && dice ? 1.2 : scaleX }}
                   />
                 );
              })}
           </div>
        </div>

        {/* LOGIC HUD */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 bg-black/40 border border-white/10 rounded-2xl">
           <h4 className="font-display font-black text-3xl mb-4 italic" style={{ color: COLORS[turn], textShadow: `0 0 15px ${COLORS[turn]}` }}>
             {turn.toUpperCase()}
           </h4>
           
           <motion.button
             onClick={rollDice}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             disabled={dice !== null || isRolling}
             className="flex flex-col items-center justify-center h-28 w-28 rounded-[2rem] border-2 border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             style={{ borderColor: dice !== null ? COLORS[turn] : 'rgba(255,255,255,0.2)' }}
           >
             {isRolling ? (
               <FiRefreshCw className="animate-spin text-white" size={40} />
             ) : dice !== null ? (
               <span className="text-6xl font-black text-white drop-shadow-xl">{dice}</span>
             ) : (
               <FiPlayCircle className="text-white" size={40} />
             )}
           </motion.button>

           <div className="mt-8 mb-4 hpx w-full bg-white/10" />

           <div className="w-full h-full max-h-[160px] overflow-y-auto rounded-xl bg-black/60 p-4 border border-white/5 text-sm font-mono scrollbar-thin scrollbar-thumb-white/10">
              {logs.map((log, i) => (
                <div key={i} className={`py-1 ${i===0 ? 'text-white font-bold drop-shadow-md' : 'text-gray-600'}`}>
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
