import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiX } from 'react-icons/fi';
import TicTacToe from './games/TicTacToe';
import ChessGame from './games/ChessGame';
import LudoGame from './games/LudoGame';

const ArcadeHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);

  const GAMES = [
    { id: 'tictactoe', name: 'TIC-TAC-TOE', desc: 'Classic 3x3 Strategy' },
    { id: 'chess', name: 'CHESS AI', desc: 'Player vs DeepBlue Engine' },
    { id: 'ludo', name: 'LUDO 4P', desc: 'Local Multiplayer Arena' },
  ];

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setActiveGame(null), 300); // Wait for modal exit animation
  };

  return (
    <>
      {/* Anchor Trigger Button in Top Right */}
      <div className="fixed top-6 right-6 md:right-10 z-[110]">
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-900 to-black border border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <div className="relative flex items-center justify-center">
            <span className="font-display font-black text-xl italic tracking-tighter text-gray-300 transition-colors group-hover:text-white">MP</span>
            <motion.div 
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className={`absolute -top-1 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-black border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.5)]`}
            >
               <FiPlay size={10} className="text-purple-400" />
            </motion.div>
          </div>
        </motion.button>
      </div>

      {/* Main Arcade Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative overflow-hidden rounded-none md:rounded-[2rem] border-0 md:border border-white/20 bg-black/90 shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-all duration-300 ${
                activeGame ? 'w-full max-w-[1200px] h-[100dvh] md:h-[95vh]' : 'w-full max-w-[600px] h-[100dvh] md:h-auto p-4 md:p-8'
              }`}
            >
              
              {/* Close Button overlay */}
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 rounded-full bg-black/60 p-3 text-white backdrop-blur-md hover:bg-red-500/80 transition-colors border border-white/20"
              >
                <FiX size={20} />
              </button>

              {!activeGame ? (
                // GAME SELECTION MENU
                <div className="flex flex-col items-center justify-center w-full h-full py-8 text-center pt-10">
                  <span className="inline-block rounded-full bg-purple-500/20 px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-purple-400 mb-2 border border-purple-500/30">
                    MP ARCADE
                  </span>
                  <h2 className="font-display text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-8 [text-shadow:_0_0_20px_#a855f7]">
                    GAMING HUB
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4 w-full max-w-[400px]">
                    {GAMES.map((game, i) => (
                      <motion.button
                        key={game.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setActiveGame(game.id)}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-all hover:border-purple-500/50 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <h3 className="font-display text-2xl font-black italic text-white tracking-tight">{game.name}</h3>
                        <p className="font-mono text-sm text-gray-400">{game.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                // ACTIVE GAME CONTAINER
                <div className="w-full h-full relative pt-16 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-4 scrollbar-thin scrollbar-thumb-white/10">
                   <button 
                     onClick={() => setActiveGame(null)}
                     className="absolute top-4 left-4 z-50 rounded-full bg-black/60 px-4 py-2 text-xs font-mono font-bold text-gray-300 backdrop-blur-md hover:text-white hover:bg-white/10 transition-colors border border-white/20"
                   >
                     ← BACK TO HUB
                   </button>
                   
                   <div className="w-full h-full flex items-center justify-center pb-8">
                     {activeGame === 'tictactoe' && <TicTacToe />}
                     {activeGame === 'chess' && <ChessGame />}
                     {activeGame === 'ludo' && <LudoGame />}
                   </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ArcadeHub;
