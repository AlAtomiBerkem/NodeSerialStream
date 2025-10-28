import cls from './Button.module.css'
import { classNames } from "../../lib/classNames.ts";

interface ButtonProps {
    className?: string;
}

export const Button = ({className}: ButtonProps) => {

return (
    <div className={classNames(cls.Button, {}, [className])}>

    </div>
    );
};