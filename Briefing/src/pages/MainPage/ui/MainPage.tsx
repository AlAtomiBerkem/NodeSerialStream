import cls from './MainPage.module.scss'
import { classNames } from "shared/lib";
import { useNavigate } from "react-router-dom";
import { routePath, RouteConfig } from "shared/config/routeConfig";
import { BackgroundScreen } from "widgets/BackgroundScreen";
import { NavCard } from "./NavCard/NavCard";

interface MainPageProps {
    className?: string;
}

export const MainPage = ({ className }: MainPageProps) => {
    const navigate = useNavigate();

    // Text content from Figma design
    // Node 219:2048 (Instructions)
    // Node 219:2053 (Exhibition)

    return (
        <BackgroundScreen className={classNames(cls.MainPage, {}, [className])}>
            <div className={cls.cardContainer}>
                <NavCard
                    title="ИНСТРУКТАЖ"
                    description="Перед входом в фюзеляж Ту-144 ознакомься с инструкцией и маршрутом экспозиции"
                    onClick={() => navigate(routePath[RouteConfig.INSTRUCTIONS])}
                />
                <NavCard
                    title="МАРШРУТ ЭКСПОЗИЦИИ"
                    description="Схема осмотра фюзеляжа с ключевыми точками и пояснениями"
                    onClick={() => navigate(routePath[RouteConfig.EXHIBITIONROUTE])}
                />
            </div>
        </BackgroundScreen>
    );
};