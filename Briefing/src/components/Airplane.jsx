import React from 'react'
import ImageButton from '../ui/ImageBtn'
import backBtn from '../assets/Btn/backBtn.png';
import { Link } from 'react-router-dom';

const Airplane = () => {
  return (
    <div className="relative">
    <div className="bg-[url(/airplane-route.png)] h-screen w-screen bg-center bg-cover">
    
    
    
    <Link to="/">
      <ImageButton
        className='absolute top-[91%] left-[44%] p-0'
        type="temporary"
        defaultImg={backBtn}
        activeImg={backBtn}
        />
    </Link>
    </div>
  </div>
  )
}

export default Airplane