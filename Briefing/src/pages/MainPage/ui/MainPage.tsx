import cls from './MainPage.module.scss'
import { classNames } from "shared/lib";
import { useNavigate } from "react-router-dom";
import { routePath, RouteConfig } from "shared/config/routeConfig";

interface MainPageProps {
    className?: string;
}

export const MainPage = ({className}: MainPageProps) => {
    const navigate = useNavigate();

    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <button onClick={() => navigate(routePath[RouteConfig.INSTRUCTIONS])}>
                Инструкции
            </button>
            <button onClick={() => navigate(routePath[RouteConfig.EXHIBITIONROUTE])}>
                Выставка
            </button>
        </div>
    );
};