import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const TestComponent = () => {
    const [idTab, setIdTab] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [testReady, setTestReady] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [result, setResult] = useState(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [nfcStatus, setNfcStatus] = useState('Приложите NFC метку');
    const [socket, setSocket] = useState(null);
 
    const quizQuestions = [
        {
            question: " Какой самолёт является самым массовым пассажирским лайнером в истории?",
            options: ["Boeing 747", "Airbus A380", "Boeing 737", "Concorde"],
            correctAnswer: "Boeing 737"
        },
        {
            question: "Как назывался первый в мире сверхзвуковой пассажирский самолёт?",
            options: ["Ту-144", "Concorde", "SR-71 Blackbird", "МиГ-31"],
            correctAnswer: "Concorde "
        },
        {
            question: `Какой истребитель называют "Летающим Крокодилом"?`,
            options: ["Су-27", "F-16 Fighting Falcon", " Су-34", "МиГ-29"],
            correctAnswer: "Су-34"
        },
        {
            question: "Какой самолёт установил рекорд скорости среди пилотируемых реактивных самолётов?",
            options: ["Lockheed SR-71 Blackbird", "МиГ-25", "North American X-15", "F-22 Raptor"],
            correctAnswer: "Lockheed SR-71 Blackbird"
        },
        {
            question: ` Какой самолёт называют "Jumbo Jet"?`,
            options: ["Airbus A380", "Boeing 747", `Ан-225 "Мрия"`, "Boeing 777"],
            correctAnswer: "Boeing 777"
        },
        {
            question: "Какой самолёт является самым большим в мире по размаху крыльев?",
            options: [`Ан-225 "Мрия"`, "Stratolaunch", "Airbus A380", "Hughes H-4 Hercules"],
            correctAnswer: "Stratolaunch"
        }
    ];

    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        newSocket.on('nfc-data', (data) => {
            const nfcId = data.trim();
            setIdTab(nfcId);
            setNfcStatus(`ID: ${nfcId} - Метка распознана`);
        });

        newSocket.on('nfc-error', (error) => {
            setNfcStatus(`Ошибка: ${error}`);
        });

        return () => newSocket.disconnect();
    }, []);

    const checkTestReadiness = async () => {
        if (!idTab) {
            setMessage('Необходимо считать NFC метку');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.get(`http://localhost:3002/api/users/${idTab}`);
            if (response.data.readyForTest) {
                setQuizStarted(true);
                setMessage('Пройдите викторину из 6 вопросов:');
            } else {
                setMessage(response.data.message || 'Неизвестная ошибка');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Ошибка сервера');
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuizAnswer = (answer) => {
        const newAnswers = [...quizAnswers];
        newAnswers[currentQuestion] = answer;
        setQuizAnswers(newAnswers);

        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizCompleted(true);
            setQuizStarted(false);
            setTestReady(true);
            setMessage('Выберите правильный ответ:');
        }
    };

    const submitAnswer = async (answer) => {
        setIsLoading(true);
        setSelectedAnswer(answer);

        try {
            await axios.post(`http://localhost:3002/api/users/${idTab}/answer`, { answer });
            setTestReady(false);
            setTestCompleted(true);
            setResult(answer);
            setMessage(`Ответ принят: ${answer}`);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Ошибка при отправке ответа');
        } finally {
            setIsLoading(false);
        }
    };

    const resetTest = () => {
        setIdTab('');
        setMessage('');
        setTestReady(false);
        setTestCompleted(false);
        setQuizStarted(false);
        setQuizCompleted(false);
        setCurrentQuestion(0);
        setQuizAnswers([]);
        setNfcStatus('Приложите NFC метку');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Тестирующая система</h1>
            
            <div style={styles.nfcStatus}>
                <div style={{
                    ...styles.statusIndicator,
                    backgroundColor: idTab ? '#4CAF50' : '#FF5722'
                }} />
                {nfcStatus}
            </div>

            {!quizStarted && !testReady && !testCompleted && (
                <div style={styles.section}>
                    <button
                        onClick={checkTestReadiness}
                        style={styles.button}
                        disabled={isLoading || !idTab}
                    >
                        {isLoading ? 'Проверка...' : 'Начать тест'}
                    </button>
                </div>
            )}

            {quizStarted && (
                <div style={styles.quizContainer}>
                    <h3>Вопрос {currentQuestion + 1} из {quizQuestions.length}</h3>
                    <p style={styles.question}>{quizQuestions[currentQuestion].question}</p>
                    <div style={styles.buttonsContainer}>
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuizAnswer(option)}
                                style={styles.answerButton}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
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
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {testCompleted && (
                <div style={styles.section}>
                    <p style={styles.result}>Тест завершен! Результат: {result}</p>
                    <button onClick={resetTest} style={styles.button}>
                        Начать заново
                    </button>
                </div>
            )}

            {message && !quizStarted && !testReady && !testCompleted && (
                <p style={styles.message}>{message}</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    title: {
        textAlign: 'center',
        color: '#333'
    },
    nfcStatus: {
        padding: '10px',
        margin: '20px 0',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center'
    },
    statusIndicator: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        marginRight: '10px'
    },
    section: {
        margin: '20px 0'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    quizContainer: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px'
    },
    question: {
        fontSize: '18px',
        margin: '20px 0'
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    answerButton: {
        padding: '10px',
        backgroundColor: '#e0e0e0',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    selectedButton: {
        backgroundColor: '#4CAF50',
        color: 'white'
    },
    message: {
        color: '#333',
        margin: '10px 0'
    },
    result: {
        color: '#4CAF50',
        fontWeight: 'bold'
    }
};

export default TestComponent;