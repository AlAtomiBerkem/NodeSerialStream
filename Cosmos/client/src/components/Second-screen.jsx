import React from 'react';
import { useState, useEffect } from 'react'
import BlueFrame from './BlueFrame';

const SecondScreen = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
            console.log('отработало')
        }, 2000)
        return () => clearTimeout(timer)
    },[])

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="kosmo-bg"></div>
            {show && <BlueFrame />}
        </div>
    )
}

export default SecondScreen;