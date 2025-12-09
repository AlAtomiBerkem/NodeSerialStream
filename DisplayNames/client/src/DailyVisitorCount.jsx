import React, { useState, useEffect } from 'react';
import axios from 'axios';
import peopleIcon from './assets/three-people-people-humans-group-svgrepo-com 1.png';

const DailyVisitorCount = () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchDailyCount = async () => {
        try {
            const response = await axios.get('http://localhost:3300/api/daily-count');
            setCount(response.data.count || 0);
            setLoading(false);
        } catch (error) {
            console.error('Ошибка получения количества посетителей:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyCount();
        const interval = setInterval(fetchDailyCount, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div 
            style={{
                position: 'absolute',
                top: -20,
                left: -100,
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                scale: 0.6
            }}
        >
            <div
                style={{
                    fontFamily: 'Akrobat',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '96px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: 'white',
                    marginBottom: '16px',
                    position: 'relative',
                    paddingBottom: '8px',
                }}
            >
                СЕГОДНЯ ПОСЕТИЛО:
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                <div
                    style={{
                        fontFamily: 'Akrobat',
                        fontWeight: 700,
                        fontStyle: 'normal',
                        fontSize: '200px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#72D8FF',
                        
                    }}
                >
                    {loading ? '...' : count}
                </div>
                
                <img
                    src={peopleIcon}
                    alt="people"
                    style={{
                        marginTop: '40px',
                        marginLeft: '25px',
                        width: '100px',
                        height: '100px',
                        opacity: 0.8,
                        scale: 1.2
                    }}
                />
            </div>
        </div>
    );
};

export default DailyVisitorCount;
