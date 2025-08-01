import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usersConfig } from './config/users.config'

const Users = () => {
    const [users, setUsers] = useState(usersConfig.users)

    useEffect(() => {
        // Раскомментировать когда бэкенд будет готов
        // const fetchUsers = async () => {
        //     try {
        //         const response = await axios.get('/api/users')
        //         setUsers(response.data)
        //     } catch (error) {
        //         console.error('Error fetching users:', error)
        //         // Используем мок-данные как fallback
        //         setUsers(usersConfig.users)
        //     }
        // }
        // fetchUsers()
    }, [])

    return (
        <div className='fixed inset-0 w-full h-full overflow-hidden overscroll-none touch-none select-none'>
            {users.map((user) => (
                <div
                    key={user.id}
                    className={`font-akrobat font-semibold text-nowrap floating-text absolute ${user.style.animation} ${user.style.className || ''}`}                    style={{
                        top: user.position.top,
                        left: user.position.left,
                        fontSize: user.style.fontSize,
                        color: user.style.color,
                        opacity: 0.85, 
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {user.name}
                </div>
            ))}
        </div>
    )
}

export default Users