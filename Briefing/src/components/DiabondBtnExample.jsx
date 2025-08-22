import { useRef } from 'react';
import DiabondBtn from './DiabondBtn';

const DiabondBtnExample = () => {
    const targetBtnRef = useRef(null);
    
    // Обработчик активации
    const handleActivate = (targetId) => {
        if (targetId === '02' && targetBtnRef.current) {
            targetBtnRef.current.activate();
        }
    };
    
    // Обработчик деактивации
    const handleDeactivate = (targetId) => {
        if (targetId === '02' && targetBtnRef.current) {
            targetBtnRef.current.reset();
        }
    };
    
    // Сброс состояния при нажатии на другую кнопку
    const handleOtherButtonClick = () => {
        if (targetBtnRef.current) {
            targetBtnRef.current.reset();
        }
    };
    
    return (
        <div style={{ 
            display: 'flex', 
            gap: '20px', 
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px'
        }}>
            {/* Кнопка-активатор с якорем на кнопку "02" */}
            <DiabondBtn 
                number="01" 
                anchor="02"
                onActivate={handleActivate}
                onDeactivate={handleDeactivate}
            />
            
            {/* Целевая кнопка, которая будет активироваться */}
            <DiabondBtn 
                ref={targetBtnRef}
                number="02" 
                pushed={false}
            />
            
            {/* Кнопка для сброса состояния */}
            <DiabondBtn 
                number="03" 
                onClick={handleOtherButtonClick}
            />
            
            <div style={{ marginLeft: '20px' }}>
                <h3>Инструкция:</h3>
                <ul>
                    <li>Кнопка "01" - активатор (связывает с кнопкой "02")</li>
                    <li>Кнопка "02" - целевая (меняет масштаб и состояние)</li>
                    <li>Кнопка "03" - сбрасывает состояние кнопки "02"</li>
                </ul>
            </div>
        </div>
    );
};

export default DiabondBtnExample; 