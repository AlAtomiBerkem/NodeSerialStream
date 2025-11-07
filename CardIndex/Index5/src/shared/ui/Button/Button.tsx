import {useState} from 'react';
import cls from './Button.module.css';
import {Link} from "react-router-dom";

interface ClickButtonProps {
    className?: string,
    normalImage?: string,
    clickedImage: string,
    alt?: string,
    link?: string | undefined,
    onClick?: () => void;
}

export const ClickButton = ({
    normalImage,
    clickedImage,
    alt = "button",
    onClick,
    link,
}: ClickButtonProps) => {
    const [isClicked, setIsClicked] = useState(false);


    const WrapperComponent = link ? Link : 'div';
    const wrapperProps = link ? { to: link } : { onClick };

    const handlePointerDown = () => {
        setIsClicked(true);
    };

    const handlePointerUpOrLeave = () => {
        setIsClicked(false);
    };

    return (
        <WrapperComponent {...wrapperProps}>
            <button
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUpOrLeave}
                onPointerLeave={handlePointerUpOrLeave}
                className={cls.button}
            >
                <img
                    src={isClicked ? clickedImage : normalImage}
                    alt={alt}
                    className={cls.image}
                />
            </button>
        </WrapperComponent>
    );
};