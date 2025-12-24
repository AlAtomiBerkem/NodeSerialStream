import cls from './MainPage.module.scss'
import { classNames } from "shared/lib";

interface MainPageProps {
    className?: string;
}

export const MainPage = ({className}: MainPageProps) => {
    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            главная страница
        </div>
    );
};