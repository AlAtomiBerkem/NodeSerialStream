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

    const handleClick = () => {
        setIsClicked(true);

        setTimeout(() => {
            setIsClicked(false);
        }, 200);
    };

    return (
        <WrapperComponent {...wrapperProps}>
            <button
                onClick={handleClick}
                className={cls.button}
                disabled={isClicked}
            >
                <img
                    src={isClicked ? clickedImage : normalImage}
                    alt={alt}
                    className={cls.image}
                    link={link}
                />
            </button>
        </WrapperComponent>
    );
};