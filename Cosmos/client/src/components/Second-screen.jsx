import React, { useRef, useEffect } from 'react';
import BlueFrame from '../ui/BlueFrame.jsx';
import FaidIn from '../ui/FaidIn.jsx';
import WebcamCapture from './WebcamCapture.jsx';
import { useCountdown } from '../context/CountdownContext.jsx';

const SecondScreen = () => {
    const webcamRef = useRef(null);
    const { resetState } = useCountdown();

    useEffect(() => {
        resetState();
    }, []);

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