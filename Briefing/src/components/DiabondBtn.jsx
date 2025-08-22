const DiabondBtn = ({ number = '01', pushed = false, onClick, noScale = false, ...props}) => {
    const strokeColor = '#72D8FF';
    const fillColor = pushed ? strokeColor : '#1a1a1a'; // Темный фон когда неактивна
    const textFillColor = pushed ? '#000000' : strokeColor;
    
    const buttonStyle = {
        transform: (pushed && !noScale) ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        filter: pushed ? 'drop-shadow(0 4px 8px rgba(114, 216, 255, 0.3))' : 'none'
    };
    
    return (
        <svg 
            width="42"
            height="42"
            viewBox="0 0 42 42" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={buttonStyle}
            onClick={onClick}
            {...props}
        >
            <path d="M41.293 21L21 41.293L0.707031 21L21 0.707031L41.293 21Z" fill={fillColor} stroke={strokeColor}/>
            <text 
                x="21" 
                y="24" 
                fill={textFillColor} 
                fontSize="19" 
                fontFamily="Akrobat, Arial, sans-serif" 
                fontWeight="700" 
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {number}
            </text>
        </svg>
    )
}

export default DiabondBtn;