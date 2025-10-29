import cls from './LastPage.module.css'
import { classNames } from "shared/lib/classNames";

interface LastPageProps {
    className?: string;
}

export const LastPage = ({className}: LastPageProps) => {

return (
    <div className={classNames(cls.LastPage, {}, [className])}>

    </div>
    );
};