import React from 'react';
// import ExitTransition from './ExitTransition';

const Greeting = ({ onExit }) => {

  const handleStart = () => {
    if (onExit) {
      onExit('/second');
    }
  };

  return (
    <div className="relative">
      <div className="bg-[url(/first-screen.png)] h-screen w-screen bg-center bg-cover"></div>
      <button 
        className="fixed top-[88%] left-[69.8%] p-0 border-none bg-transparent cursor-pointer button-hover"
        onClick={handleStart}
      >
        <img 
          src="/btn-start.png" 
          className="w-auto h-auto"
        />
      </button>
    </div>
  )
}

export default Greeting;