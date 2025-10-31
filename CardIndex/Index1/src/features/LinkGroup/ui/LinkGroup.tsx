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
        <LinkButton link={RouteConfig.FIRST} nameBtn={'ЧТО ТАКОЕ КБ'} />
        <LinkButton link={RouteConfig.SECOND} nameBtn={'ИЗВЕСТНЫЕ КБ СССР И РОССИИ'}/>
        <LinkButton link={RouteConfig.LAST}  nameBtn={'СОВРЕМЕННЫЕ КБ: НОВЫЕ ГОРИЗОНТЫ И ПЕРСПЕКТИВЫ'}/>
    </div>
    );
};