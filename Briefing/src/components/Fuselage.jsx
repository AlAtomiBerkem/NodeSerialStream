import React from 'react'
import ImageButton from '../ui/ImageBtn'
import backBtn from '../assets/Btn/backBtn.png';
import { Link } from 'react-router-dom';
import RadionbtnGroup from './RadiobtnGroup.jsx'

const Fuselage = () => {
  return (
    <div className="relative flex">
        <div className="relative bg-[url(/fuselage.png)] flex-row h-screen w-screen bg-center  bg-cover">
            

            <div className='absolute top-[16%] left-[10%] flex flex-row border-red-500 w-226 h-170 overflow-scroll text'>
            Фюзеляж Ту-144 представляет собой прочную и аэродинамически выверенную конструкцию, разработанную для сверхзвуковых полётов на скорости до 2 500 км/ч. Его форма и структура обеспечивали минимальное сопротивление воздуха, устойчивость при высоких скоростях и комфорт для пассажиров. Корпус был выполнен из алюминиевых сплавов, способных выдерживать значительные термические и механические нагрузки, возникающие при полётах на больших высотах и скоростях. Особое внимание уделялось прочности силового каркаса и герметичности кабины.
            </div>   
            
            <div className='absolute flex flex-row top-[53%] left-[10%] border-2 border-gray-500 border-solid w-226 h-150'>

            </div>

            <RadionbtnGroup className='absolute border-2 flex flex-row top-[83%] left-[42%]'/>
        
            
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