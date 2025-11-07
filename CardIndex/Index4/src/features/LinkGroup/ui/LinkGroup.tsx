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
        <LinkButton link={RouteConfig.FIRST} nameBtn={'Как строят самолеты'} />
        <LinkButton link={RouteConfig.SECOND} nameBtn={'Крупнейшие заводы России'}/>
        <LinkButton link={RouteConfig.LAST}  nameBtn={'Цифровое производство: завод будущего'}/>
    </div>
    );
};