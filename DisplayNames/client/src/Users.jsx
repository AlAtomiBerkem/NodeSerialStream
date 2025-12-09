import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { usersConfig } from './config/users.config'

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const lastServerDataRef = useRef(null)


    const truncateName = (name, fontSize) => {
        const fontSizeNum = parseInt(fontSize)
        
        let maxLength
        if (fontSizeNum >= 80) {
            maxLength = 14 
        } else if (fontSizeNum >= 60) {
            maxLength = 12
        } else if (fontSizeNum >= 40) {
            maxLength = 18
        } else {
            maxLength = 25
        }
        
        if (name.length <= maxLength) {
            return name
        }
        
        return name.substring(0, maxLength - 3) + "..."
    }


    const transformServerData = (serverUsers) => {
        const positions = usersConfig.users.map(user => user.position)
        
        return serverUsers.map((serverUser, index) => {
            const position = positions[index % positions.length]
            const fontSize = usersConfig.users[index % usersConfig.users.length].style.fontSize
            const originalName = serverUser.UserName || `Пользователь ${index + 1}`
            
            return {
                id: serverUser.idTab || serverUser._id || index + 1,
                name: truncateName(originalName, fontSize),
                originalName: originalName,
                position: position,
                style: {
                    fontSize: fontSize,
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
                        originalName: newUser.originalName,
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
                const dataChanged = JSON.stringify(serverData) !== JSON.stringify(lastServerDataRef.current)
                if (dataChanged) {
                    lastServerDataRef.current = serverData
                }
                
                updateUsers(serverData)
                
                setError(null)
            } catch (error) {
                console.error('Error fetching users:', error)
                setError('Не удалось загрузить пользователей')
                // Не очищаем пользователей при ошибке, чтобы они не пропадали
                // setUsers([])
            }
        }

        fetchUsers().finally(() => setLoading(false))
        
        const interval = setInterval(fetchUsers, 5000)
        
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const cleanupInterval = setInterval(() => {
            setUsers(currentUsers => {
                const now = Date.now()
                const sixtySecondsAgo = now - 60000
                
                const activeUsers = currentUsers.filter(user => 
                    user.lastSeen > sixtySecondsAgo
                )
                
                if (activeUsers.length !== currentUsers.length) {
                    console.log(`Удалено ${currentUsers.length - activeUsers.length} неактивных пользователей (последний раз видели более 60 секунд назад)`)
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