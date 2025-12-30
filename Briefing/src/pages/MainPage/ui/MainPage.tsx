import { Link } from "react-router-dom";
import { routePath, RouteConfig } from "shared/config/routeConfig";
import { BackgroundScreen } from "widgets/BackgroundScreen";
import cls from './MainPage.module.scss'
import { classNames } from "shared/lib";

import InstructionHeader from "shared/assets/instruction.svg";
import InstructionBtn from "shared/assets/instructionPageBtn.svg";
import RouteBtn from "shared/assets/RoutMapPageBtn.svg";
import Logo from "shared/assets/Label.svg";

interface MainPageProps {
    className?: string;
}

export const MainPage = ({ className }: MainPageProps) => {
    return (
        <BackgroundScreen className={classNames(cls.MainPage, {}, [className])}>
            <div className={cls.container}>
                <div className={cls.header}>
                    <img src={InstructionHeader} className={cls.headerMain} alt="Инструктаж" />
                </div>

                <p className={cls.subtitle}>
                    Перед входом в фюзеляж Ту-144 ознакомься с инструкцией <br />
                    и маршрутом экспозиции
                </p>

                <div className={cls.btnContainer}>
                    <Link to={routePath[RouteConfig.INSTRUCTIONS]} className={cls.link}>
                        <img src={InstructionBtn} className={cls.btnImg} alt="Инструкция" />
                    </Link>
                    <Link to={routePath[RouteConfig.EXHIBITIONROUTE]} className={cls.link}>
                        <img src={RouteBtn} className={cls.btnImg} alt="Маршрут экспозиции" />
                    </Link>
                </div>

                <div className={cls.footer}>
                    <img src={Logo} className={cls.logo} alt="Ту-144 Музей" />
                </div>
            </div>
        </BackgroundScreen>
    );
};