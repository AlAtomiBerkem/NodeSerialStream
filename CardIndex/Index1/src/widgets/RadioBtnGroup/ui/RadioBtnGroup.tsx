import cls from './RadioBtnGroup.module.css'
import { classNames } from "shared/lib/classNames";
import {RadioButton} from "shared/ui";
import btn from 'shared/assets/btn/btnUnPushed.svg?url'
import btnUnActive from 'shared/assets/btn/btnPushed.svg?url'
import radiWrapper from 'shared/assets/icons/radiobtnwrapper.png'

interface RadioBtnGroupProps {
    className?: string;
}

export const RadioBtnGroup = ({className}: RadioBtnGroupProps) => {

return (
        <div className={classNames(cls.RadioBtnGroup, {}, [className])}>
            <img src={radiWrapper} alt="radiowrapper"/>
            <div className={cls.RadioBtnGroupButtons}>
                <RadioButton  activeImage={btnUnActive} defaultImage={btn}/>
                <RadioButton  activeImage={btnUnActive} defaultImage={btn}/>
                <RadioButton  activeImage={btnUnActive} defaultImage={btn}/>
                <RadioButton  activeImage={btnUnActive} defaultImage={btn}/>
            </div>
        </div>
    );
};
