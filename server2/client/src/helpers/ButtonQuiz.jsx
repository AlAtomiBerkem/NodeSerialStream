import React from 'react';

const ButtonQuiz = ({
    top,
    left,
    activeImg,
    inactiveImg,
    onClick,
    isActive,
    alt,
}) => {
    return (
        <button
            onClick={onClick}
            style={{
                position: 'absolute',
                top: top,
                left: left,
                transform: 'translate(-50%, -50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
            }}
        >
            <img
                src={isActive ? activeImg : inactiveImg}
                alt={alt || 'Button'}
            />
        </button>
    );
};

export default React.memo(ButtonQuiz);
