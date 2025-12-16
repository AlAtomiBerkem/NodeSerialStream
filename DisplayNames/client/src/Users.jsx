import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { usersConfig } from './config/users.config'

const MAX_DISPLAY_USERS = 30; // Максимум пользователей на экране одновременно
const ROTATION_INTERVAL = 180000; // Интервал смены группы (3 минуты)

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
    const [rotationSeed, setRotationSeed] = useState(0) // Смещение для перемешивания окон
    const [allArchivedUsers, setAllArchivedUsers] = useState([])


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


    const transformServerData = (serverUsers, startIndex = 0) => {
        const positions = usersConfig.users.map(user => user.position)
        
        return serverUsers.map((serverUser, index) => {
            const globalIndex = startIndex + index;
            const position = positions[globalIndex % positions.length]
            const fontSize = usersConfig.users[globalIndex % usersConfig.users.length].style.fontSize
            const originalName = serverUser.UserName || `Пользователь ${globalIndex + 1}`
            
            return {
                // Используем _id как уникальный ключ для React; если его нет, падаем назад
                // на комбинацию idTab + globalIndex, чтобы ключи точно не совпадали.
                id: serverUser._id || `${serverUser.idTab || 'no-idTab'}-${globalIndex + 1}`,
                name: truncateName(originalName, fontSize),
                originalName: originalName,
                position: position,
                style: {
                    fontSize: fontSize,
                    color: serverUser.checkingRoomOne?.[0] ? "#72D8FF" : "white",
                    animation: usersConfig.users[globalIndex % usersConfig.users.length].style.animation,
                    className: serverUser.checkingRoomTwo?.[0] ? "glow-text" : ""
                },
                serverId: serverUser._id || serverUser.idTab,
                lastSeen: Date.now()
            }
        })
    }

    // Функция для получения текущей группы пользователей для отображения
    const getCurrentGroup = (allUsers, groupIndex) => {
        if (allUsers.length <= MAX_DISPLAY_USERS) {
            return allUsers;
        }

        const totalUsers = allUsers.length;
        // Берём окно длиной MAX_DISPLAY_USERS, при необходимости делаем wrap вокруг начала массива,
        // чтобы даже для неполной последней группы экран всегда был заполнен.
        const startIndex = (groupIndex * MAX_DISPLAY_USERS + rotationSeed) % totalUsers;
        const window = [];

        for (let i = 0; i < MAX_DISPLAY_USERS; i++) {
            const idx = (startIndex + i) % totalUsers;
            window.push(allUsers[idx]);
        }

        return window;
    }

    // Функция для вычисления количества групп
    const getTotalGroups = (totalUsers) => {
        return Math.ceil(totalUsers / MAX_DISPLAY_USERS);
    }

    useEffect(() => {
        const fetchArchivedUsers = async () => {
            try {
                // Получаем архивных пользователей за последние 24 часа
                const response = await axios.get('http://localhost:3300/api/daily-archived')
                const archivedData = response.data
                
                if (Array.isArray(archivedData)) {
                    // Удаляем только дубликаты по _id (Mongo гарантирует уникальность _id),
                    // idTab больше не используем для фильтрации, чтобы один планшет (idTab)
                    // мог дать несколько разных посетителей за день.
                    const seenIds = new Set();
                    const uniqueUsers = archivedData.filter(user => {
                        const id = user._id;
                        if (!id || seenIds.has(id)) {
                            return false;
                        }
                        seenIds.add(id);
                        return true;
                    });

                    // Перемешиваем порядок, чтобы группы были смешанные
                    const shuffledUsers = [...uniqueUsers].sort(() => Math.random() - 0.5);

                    setAllArchivedUsers(shuffledUsers);
                    
                    // Вычисляем текущую группу для отображения
                    const totalGroups = getTotalGroups(shuffledUsers.length);
                    if (totalGroups > 0) {
                        const currentGroup = getCurrentGroup(shuffledUsers, currentGroupIndex);
                        const transformedUsers = transformServerData(currentGroup, currentGroupIndex * MAX_DISPLAY_USERS);
                        setUsers(transformedUsers);
                    } else {
                        setUsers([]);
                    }
                    
                    setError(null);
                }
            } catch (error) {
                console.error('Error fetching archived users:', error)
                setError('Не удалось загрузить пользователей')
            }
        }

        fetchArchivedUsers().finally(() => setLoading(false))
        
        const interval = setInterval(fetchArchivedUsers, 10000) // Обновляем каждые 10 секунд
        
        return () => clearInterval(interval)
    }, [currentGroupIndex])

    // Ротация групп пользователей
    useEffect(() => {
        const totalGroups = getTotalGroups(allArchivedUsers.length);
        
        if (totalGroups <= 1) {
            return; // Если групп одна или меньше, ротация не нужна
        }
        
        const rotationInterval = setInterval(() => {
            setCurrentGroupIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % totalGroups;
                // Меняем seed, чтобы сдвигать окно и перемешивать старые/новые
                setRotationSeed(Math.floor(Math.random() * Math.max(allArchivedUsers.length, 1)));
                console.log(`Ротация: переключение на группу ${nextIndex + 1} из ${totalGroups} (всего пользователей: ${allArchivedUsers.length})`);
                return nextIndex;
            });
        }, ROTATION_INTERVAL);
        
        return () => clearInterval(rotationInterval);
    }, [allArchivedUsers.length])



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