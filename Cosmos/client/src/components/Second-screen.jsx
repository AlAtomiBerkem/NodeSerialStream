import React, { useRef } from 'react';
import BlueFrame from '../ui/BlueFrame.jsx';
import FaidIn from '../ui/FaidIn.jsx';
import WebcamCapture from './WebcamCapture.jsx';

const SecondScreen = () => {
    const webcamRef = useRef(null);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="kosmo-bg"></div>
            <WebcamCapture ref={webcamRef} />

            <FaidIn>
                <BlueFrame webcamRef={webcamRef} />
            </FaidIn>
        </div>
    )
}

export default SecondScreen;