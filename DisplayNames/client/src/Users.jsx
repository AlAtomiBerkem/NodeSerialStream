import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usersConfig } from './config/users.config'

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [lastServerData, setLastServerData] = useState(null)


    const transformServerData = (serverUsers) => {
        const positions = usersConfig.users.map(user => user.position)
        
        return serverUsers.map((serverUser, index) => {
            const position = positions[index % positions.length]
            
            return {
                id: serverUser.idTab || serverUser._id || index + 1,
                name: serverUser.UserName || `Пользователь ${index + 1}`,
                position: position,
                style: {
                    fontSize: usersConfig.users[index % usersConfig.users.length].style.fontSize,
                    color: serverUser.checkingRoomOne?.[0] ? "#72D8FF" : "white",
                    animation: usersConfig.users[index % usersConfig.users.length].style.animation,
                    className: serverUser.checkingRoomTwo?.[0] ? "glow-text" : ""
                },
                serverId: serverUser._id,
                lastSeen: Date.now()
            }
        })
    }

    const updateUsers = (newServerUsers) => {
        setUsers(currentUsers => {
            const newUsers = transformServerData(newServerUsers)
            
            const currentUsersMap = new Map(
                currentUsers.map(user => [user.serverId, user])
            )
            
            const newUsersMap = new Map(
                newUsers.map(user => [user.serverId, user])
            )
            
            const usersToRemove = currentUsers.filter(
                user => !newUsersMap.has(user.serverId)
            )
            
            const usersToAdd = newUsers.filter(
                user => !currentUsersMap.has(user.serverId)
            )
            
            const updatedUsers = currentUsers
                .filter(user => newUsersMap.has(user.serverId))
                .map(user => {
                    const newUser = newUsersMap.get(user.serverId)
                    return {
                        ...user,
                        name: newUser.name,
                        style: newUser.style,
                        lastSeen: Date.now()
                    }
                })
            
            const finalUsers = [...updatedUsers, ...usersToAdd]
            
            console.log(`Обновление пользователей: ${usersToAdd.length} добавлено, ${usersToRemove.length} удалено`)
            
            return finalUsers
        })
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3300/api/users')
                const serverData = response.data
                
                if (JSON.stringify(serverData) !== JSON.stringify(lastServerData)) {
                    setLastServerData(serverData)
                    updateUsers(serverData)
                }
                
                setError(null)
            } catch (error) {
                console.error('Error fetching users:', error)
                setError('Не удалось загрузить пользователей')
                setUsers([])
            }
        }

        fetchUsers().finally(() => setLoading(false))
        
        const interval = setInterval(fetchUsers, 5000)
        
        return () => clearInterval(interval)
    }, [lastServerData])

    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            setUsers(currentUsers => {
                const now = Date.now()
                const thirtySecondsAgo = now - 30000
                
                const activeUsers = currentUsers.filter(user => 
                    user.lastSeen > thirtySecondsAgo
                )
                
                if (activeUsers.length !== currentUsers.length) {
                    console.log(`Удалено ${currentUsers.length - activeUsers.length} неактивных пользователей`)
                }
                
                return activeUsers
            })
        }, 10000)
        
        return () => clearInterval(cleanupInterval)
    }, [])


    return (
        <div className='fixed inset-0 w-full h-full overflow-hidden overscroll-none touch-none select-none'>
            {users.map((user) => (
                <div
                    key={user.id}
                    className={`font-akrobat font-semibold text-nowrap floating-text absolute ${user.style.animation} ${user.style.className || ''}`}
                    style={{
                        top: user.position.top,
                        left: user.position.left,
                        fontSize: user.style.fontSize,
                        color: user.style.color,
                        opacity: 0.85, 
                        transform: 'translate(-50%, -50%)',
                        transition: 'opacity 0.5s ease-in-out'
                    }}
                >
                    {user.name}
                </div>
            ))}
        </div>
    )
}

export default Users