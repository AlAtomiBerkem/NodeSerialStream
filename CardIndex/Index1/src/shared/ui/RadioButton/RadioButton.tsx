import cls from './RadioButton.module.css';
import { classNames } from "shared/lib/classNames";
import type { FC } from "react";
import type {ButtonSliderProps} from './RadioButton.constants.ts'
import {ButtonSliderTheme, ThemeStyle} from './RadioButton.constants.ts'

export const RadioButton: FC<ButtonSliderProps> = (props) => {
    const {
        className,
        theme = ButtonSliderTheme.DEFAULT,
        isActive = false,
        defaultImage,
        styleTheme = ThemeStyle.CLEAR, 
        activeImage,
        alt = "Кнопка слайдера",
        index = 0,
        onButtonClick,
        ...otherProps
    } = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onButtonClick?.(index);
    };

    return (
        <button
            className={classNames(
                cls.ButtonSlider,
                {},
                [className, cls[theme], cls[styleTheme], isActive ? cls.active : '']
            )}
            onClick={handleClick}
            aria-pressed={isActive}
            {...otherProps}
        >
            <img
                src={isActive ? activeImage : defaultImage}
                alt={isActive ? `Активная ${alt}` : alt}
                className={cls.buttonImage}
            />
        </button>
    );
};