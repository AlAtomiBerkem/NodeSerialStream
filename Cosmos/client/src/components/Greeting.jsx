import React from 'react';

const Greeting = () => {
    return (
        <div className="relative">
            <div className="bg-[url(/first-screen.png)] h-screen w-screen bg-center bg-cover"></div>
            <button 
                className="fixed top-[88%] left-[69.8%] p-0 border-none bg-transparent cursor-pointer"
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