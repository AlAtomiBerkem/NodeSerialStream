import { useState } from 'react';
import cls from './Button.module.css';

interface ClickButtonProps {
    className?: string;
    normalImage?: string;
    clickedImage: string;
    alt?: string;
}

export const ClickButton = ({ 
    normalImage, 
    clickedImage, 
    alt = "button" 
}: ClickButtonProps) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        
        setTimeout(() => {
            setIsClicked(false);
        }, 300);
    };

    return (
        <button 
            onClick={handleClick} 
            className={cls.button}
            disabled={isClicked}
        >
            <img 
                src={isClicked ? clickedImage : normalImage} 
                alt={alt}
                className={cls.image}
            />
        </button>
    );
};