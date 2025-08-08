import React from 'react';
import BlueFrame from '../ui/BlueFrame.jsx';
import FaidIn from '../ui/FaidIn.jsx';

const SecondScreen = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="kosmo-bg"></div>
            
            <FaidIn> 
                <BlueFrame /> 
            </FaidIn>
        </div>
    )
}

export default SecondScreen;