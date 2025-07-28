import React from 'react'
import axios from 'axios'

const Users = () => {
    return (
        <div className='relative'>
            <div className='border-2 border-red-500 p-5 h-[200px] w-[200px] relative'>  
                <div 
                    className='text-white absolute animate-float text-nowrap'
                    style={{
                        animation: 'float 20s linear infinite'
                    }}
                >
                    Иван Иванович Иванов
                </div>  
            </div>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translate(0px, 0px); }
                    25% { transform: translate(70px, 0px); }
                    50% { transform: translate(70px, 30px); }
                    75% { transform: translate(0px, 30px); }
                    100% { transform: translate(0px, 0px); }
                }
            `}</style>
        </div>
    )
}

export default Users