import cls from './Instructions.module.scss'
import { classNames } from "shared/lib";

interface InstructionsProps {
    className?: string;
}

export const Instructions = ({className}: InstructionsProps) => {

return (
    <div className={classNames(cls.Instructions, {}, [className])}>
         тут видимо описание самолетиков
    </div>
    );
};