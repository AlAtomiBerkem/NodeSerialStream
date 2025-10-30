import cls from './RadioBtnGroup.module.css'
import { classNames } from "shared/lib/classNames";
import {RadioButton} from "shared/ui";
import btn from 'shared/assets/btn/btnUnPushed.svg?url'
import btnUnActive from 'shared/assets/btn/btnPushed.svg?url'
import radiWrapper from 'shared/assets/icons/radiobtnwrapper.png'

interface RadioBtnGroupProps {
    className?: string;
    count: number;
    activeIndex: number;
    onChange: (idx: number) => void;
}

export const RadioBtnGroup = ({className, count, activeIndex, onChange}: RadioBtnGroupProps) => {
    return (
        <div className={classNames(cls.RadioBtnGroup, {}, [className])}>
            <img src={radiWrapper} alt="radiowrapper"/>
            <div className={cls.RadioBtnGroupButtons}>
                {Array.from({ length: count }, (_, i) => (
                    <RadioButton
                        key={i}
                        activeImage={btnUnActive}
                        defaultImage={btn}
                        isActive={i === activeIndex}
                        index={i}
                        onButtonClick={onChange}
                    />
                ))}
            </div>
        </div>
    );
};
