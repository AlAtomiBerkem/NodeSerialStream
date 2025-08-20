import React from 'react'
import ImageButton from '../ui/ImageBtn'
import backBtn from '../assets/Btn/backBtn.png';
import { Link } from 'react-router-dom';

const Fuselage = () => {
  return (
    <div className="relative flex">
        <div className="bg-[url(/fuselage.png)] flex-row h-screen w-screen bg-center bg-cover">
            

            <div className=' border-2 border-solid flex flex-row border-red-500 w-100 h-150 text'>

            </div>   

        
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

export default Fuselage