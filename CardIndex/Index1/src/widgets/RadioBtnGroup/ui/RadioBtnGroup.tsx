import cls from './RadioBtnGroup.module.css'
import { classNames } from "shared/lib/classNames";
import {RadioButton} from "shared/ui";
import {}

interface RadioBtnGroupProps {
    className?: string;
}

export const RadioBtnGroup = ({className}: RadioBtnGroupProps) => {

return (
    <div className={classNames(cls.RadioBtnGroup, {}, [className])}>
        <img src="" alt=""/>
        <RadioButton  activeImage={} defaultImage={}/>
    </div>
    );
};

export default RadioBtnGroup;