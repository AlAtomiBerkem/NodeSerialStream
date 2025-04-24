import React, { useState } from 'react';
import axios from 'axios';

const TestComponent = () => {
    const [idTab, setIdTab] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [testReady, setTestReady] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState(null);

    const checkTestReadiness = async () => {
        if (!idTab) {
            setMessage('Введите ID планшета');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.get(`http://localhost:4000/api/users/${idTab}`);

            if (response.data.readyForTest) {
                setTestReady(true);
                setMessage('Выберите правильный ответ:');
            } else {
                setMessage(response.data.message || 'Неизвестная ошибка');
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'Ошибка сервера');
            } else {
                setMessage('Не удалось подключиться к серверу');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const submitAnswer = async (answer) => {
        setIsLoading(true);
        setSelectedAnswer(answer);

        try {
            const response = await axios.post(`http://localhost:4000/api/users/${idTab}/answer`, {
                answer: answer
            });

            setTestReady(false);
            setTestCompleted(true);
            setResult(answer);
            setMessage(`Ответ принят: ${answer}`);
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || 'Ошибка при отправке ответа');
            } else {
                setMessage('Не удалось отправить ответ');
            }
            setSelectedAnswer(null);
        } finally {
            setIsLoading(false);
        }
    };

    const resetTest = () => {
        setIdTab('');
        setMessage('');
        setIsLoading(false);
        setTestReady(false);
        setTestCompleted(false);
        setSelectedAnswer(null);
        setResult(null);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Тестирующая система</h1>

            {!testReady && !testCompleted && (
                <div style={styles.section}>
                    <input
                        type="text"
                        value={idTab}
                        onChange={(e) => setIdTab(e.target.value)}
                        placeholder="Введите ID планшета"
                        style={styles.input}
                        disabled={isLoading}
                    />
                    <button
                        onClick={checkTestReadiness}
                        style={styles.button}
                        disabled={isLoading || !idTab}
                    >
                        {isLoading ? 'Проверка...' : 'Начать тест'}
                    </button>
                </div>
            )}

            {testReady && (
                <div style={styles.section}>
                    <p style={styles.message}>{message}</p>
                    <div style={styles.buttonsContainer}>
                        {[123, 456, 789].map((answer) => (
                            <button
                                key={answer}
                                onClick={() => submitAnswer(answer)}
                                style={{
                                    ...styles.answerButton,
                                    ...(selectedAnswer === answer && styles.selectedButton)
                                }}
                                disabled={isLoading}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {testCompleted && (
                <div style={styles.section}>
                    <p style={styles.result}>Тест завершен! Ваш результат: {result}</p>
                    <button onClick={resetTest} style={styles.button}>
                        Начать заново
                    </button>
                </div>
            )}

            {message && !testReady && !testCompleted && (
                <p style={{ ...styles.message, color: message.includes('не все тесты') ? 'red' : 'inherit' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

// Стили компонента
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    title: {
        color: '#333',
        marginBottom: '30px',
    },
    section: {
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        marginRight: '10px',
        width: '200px',
        fontSize: '16px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    message: {
        margin: '20px 0',
        fontSize: '18px',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    answerButton: {
        padding: '15px 25px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'all 0.3s',
    },
    selectedButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
    },
    result: {
        fontSize: '20px',
        color: '#4CAF50',
        fontWeight: 'bold',
        margin: '20px 0',
    },
};

export default TestComponent;