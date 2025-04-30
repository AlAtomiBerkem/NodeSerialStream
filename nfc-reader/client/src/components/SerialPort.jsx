import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function SerialPort({ onSerialData }) {
    const [data, setData] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const socket = io('http://localhost:5100', {
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        // Обработчики событий
        socket.on('connect', () => {
            setIsConnected(true);
            setError(null);
            console.log('Connected to WebSocket server');
        });

        socket.on('serial-data', (newData) => {
            setData(prev => [...prev, newData]);
            onSerialData(newData); // пробс для прокидывания в app
        });

        socket.on('serial-error', (err) => {
            setError(`Device error: ${err}`);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
            setError('Disconnected from server. Reconnecting...');
        });

        socket.on('connect_error', (err) => {
            setError(`Connection error: ${err.message}`);
        });

        return () => {
            socket.disconnect();
        };
    }, [onSerialData]);

    return (
        <div style={{ padding: '10px', fontFamily: 'Arial', maxWidth: '400px', margin: '20px auto' }}>
            <h1>COM port</h1>

            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: isConnected ? 'green' : 'red',
                    marginRight: '8px'
                }} />
                <span>
                    {isConnected ? 'Connected to server' : 'Disconnected'}
                </span>
            </div>

            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                </div>
            )}

            <div style={{
                height: '200px',
                border: '1px solid #ccc',
                overflowY: 'auto',
                padding: '10px',
                fontFamily: 'monospace',
                backgroundColor: '#f5f5f5'
            }}>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index}>{item}</div>
                    ))
                ) : (
                    <div style={{ color: '#666' }}>Waiting for data...</div>
                )}
            </div>
        </div>
    );
}

export default SerialPort;
