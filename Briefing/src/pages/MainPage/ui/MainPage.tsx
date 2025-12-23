import cls from './MainPage.module.scss'
import { classNames } from "shared/lib";
import { BackgroundScreen } from "widgets/BackgroundScreen";

interface MainPageProps {
    className?: string;
}

export const MainPage = ({className}: MainPageProps) => {

return (
    <div className={classNames(cls.MainPage, {}, [className])}>
        <BackgroundScreen>
            главная страница
        </BackgroundScreen>
    </div>
    );
};