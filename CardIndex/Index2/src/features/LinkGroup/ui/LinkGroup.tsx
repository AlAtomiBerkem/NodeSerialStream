import cls from './LinkGroup.module.css'
import { classNames } from "shared/lib/classNames.ts";
import {LinkButton} from "widgets/LinkBtn";
import { RouteConfig } from 'shared/config/routeConfig';
interface LinkGroupProps {
    className?: string;
}

export const LinkGroup = ({className}: LinkGroupProps) => {

return (
    <div className={classNames(cls.LinkGroup, {}, [className])}>
        <LinkButton link={RouteConfig.FIRST} nameBtn={'Вузы авиационного профиля'} />
        <LinkButton link={RouteConfig.SECOND} nameBtn={'Как сегодня готовят авиационные кадры'}/>
        <LinkButton link={RouteConfig.LAST}  nameBtn={'Карьерный путь и развитие специалистов\n' +
            'авиационной отрасли'}/>
    </div>
    );
};