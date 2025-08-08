import React from 'react';
import WhiteFrame from '../ui/WhiteFrame.jsx';
import FaidIn from '../ui/FaidIn.jsx'

const ThreeScreen = () => {

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="kosmo-done-bg"></div>
            <FaidIn> 
                <WhiteFrame /> 
            </FaidIn>
        </div>
    )
}

export default ThreeScreen;