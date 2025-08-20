import React from 'react'
import btn144 from '../assets/Btn/btn144.png';
import btnExhibition from '../assets/Btn/btnExhibition.png';
import btn144Pushed from '../assets/Btn/btn144Pushed.png'
import btnExhibitionPushed from '../assets/Btn/btnExhibitionPushed.png'
import ImageButton from '../ui/ImageBtn.jsx'
import { Link } from "react-router-dom";



const Start = () => {
  return (
    <div className="relative">
      <div className="bg-[url(/start-screen.png)] h-screen w-screen bg-center bg-cover">

    <Link to="/fuselage">
      <ImageButton
        className='absolute top-[35%] left-[13%] p-0'
        type="temporary"
        defaultImg={btn144}
        activeImg={btn144Pushed}
        />
    </Link>

    <Link to="/airplane">
      <ImageButton
        className='absolute top-[49%] left-[13%] p-0'
        type="temporary"
        defaultImg={btnExhibition}
        activeImg={btnExhibitionPushed}
        />    
    </Link>

        </div>
      </div>

  )
}

export default Start