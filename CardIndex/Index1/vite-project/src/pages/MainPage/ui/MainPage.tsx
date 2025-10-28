import cls from './MainPage.module.css'
import { classNames } from "shared/lib/classNames";

interface MainPageProps {
    className?: string;
}

export const MainPage = ({className}: MainPageProps) => {

return (
    <div className={classNames(cls.MainPage, {}, [className])}>

    </div>
    );
};