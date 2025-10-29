import cls from './SecondPage.module.css'
import { classNames } from "shared/lib/classNames";

interface SecondPageProps {
    className?: string;
}

export const SecondPage = ({className}: SecondPageProps) => {

return (
    <div className={classNames(cls.SecondPage, {}, [className])}>

    </div>
    );
};