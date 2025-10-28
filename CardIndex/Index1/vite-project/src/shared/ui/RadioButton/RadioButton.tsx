import cls from "./RadioButton.module.css"
import { classNames } from "shared/lib/classNames";

interface RadioButtonProps {
    className?: string;
}

export const RadioButton = ({className}: RadioButtonProps) => {

return (
    <div className={classNames(cls.RadioButton, {}, [className])}> 
    
    </div> 
    );
};

export default RadioButton;