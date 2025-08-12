import React from 'react';
import BlueFrame from '../ui/BlueFrame.jsx';
import FaidIn from '../ui/FaidIn.jsx';
import WebcamCapture from './WebcamCapture.jsx';
import { useDispatch } from 'react-redux';
import { pushed } from '../store/Photoslice.js'


const SecondScreen = () => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(pushed());
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="kosmo-bg"></div>

            <div className="absolute top-50 inset-0 flex items-center justify-center z-[5]">
                <WebcamCapture  />
            </div>

            <FaidIn>
                <BlueFrame onButtonClick={handleClick} />
            </FaidIn>
        </div>
    )
}

export default SecondScreen;