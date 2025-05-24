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
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState([]);

 
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

    const checkTestReadiness = async () => {
        if (!idTab) {
            setMessage('Введите ID планшета');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.get(`http://localhost:3002/api/users/${idTab}`);

            if (response.data.readyForTest) {
                setQuizStarted(true); // Начинаем викторину вместо сразу теста
                setMessage('Пройдите викторину из 6 вопросов:');
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

    const handleQuizAnswer = (answer) => {
        const newAnswers = [...quizAnswers];
        newAnswers[currentQuestion] = answer;
        setQuizAnswers(newAnswers);

        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizCompleted(true);
            setQuizStarted(false);
            setTestReady(true); // После викторины переходим к выбору числа
            setMessage('Выберите правильный ответ:');
        }
    };

    const submitAnswer = async (answer) => {
        setIsLoading(true);
        setSelectedAnswer(answer);

        try {
            const response = await axios.post(`http://localhost:3002/api/users/${idTab}/answer`, {
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
        setQuizStarted(false);
        setQuizCompleted(false);
        setCurrentQuestion(0);
        setQuizAnswers([]);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Тестирующая система</h1>

            {!quizStarted && !testReady && !testCompleted && (
                <div style={styles.section}>
                    <input
                        type="text"
                        value={idTab}
                        onChange={(e) => setIdTab(e.target.value)}
                        placeholder="Введите ID"
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

            {quizStarted && (
                <div style={styles.section}>
                    <p style={styles.message}>{message}</p>
                    <div style={styles.quizContainer}>
                        <h3>Вопрос {currentQuestion + 1} из {quizQuestions.length}</h3>
                        <p style={styles.question}>{quizQuestions[currentQuestion].question}</p>
                        <div style={styles.buttonsContainer}>
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuizAnswer(option)}
                                    style={styles.answerButton}
                                    disabled={isLoading}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <p style={styles.progress}>
                            Прогресс: {currentQuestion + 1}/{quizQuestions.length}
                        </p>
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

            {message && !quizStarted && !testReady && !testCompleted && (
                <p style={{ ...styles.message, color: message.includes('не все тесты') ? 'red' : 'inherit' }}>
                    {message}
                </p>
            )}
        </div>
    );
};

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
    quizContainer: {
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px',
    },
    question: {
        fontSize: '18px',
        margin: '20px 0',
        fontWeight: 'bold',
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
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
    progress: {
        marginTop: '20px',
        color: '#666',
    },
};

export default TestComponent;