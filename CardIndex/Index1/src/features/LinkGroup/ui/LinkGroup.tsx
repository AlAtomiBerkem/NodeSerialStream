import cls from './LinkGroup.module.css'
import { classNames } from "shared/lib/classNames.ts";
import {LinkButton} from "widgets/LinkBtn";

interface LinkGroupProps {
    className?: string;
}

export const LinkGroup = ({className}: LinkGroupProps) => {

return (
    <div className={classNames(cls.LinkGroup, {}, [className])}>
        <LinkButton  nameBtn={'ЧТО ТАКОЕ КБ'}/>
        <LinkButton  nameBtn={'ИЗВЕСТНЫЕ КБ СССР  И РОССИИ'}/>
        <LinkButton  nameBtn={'СОВРЕМЕННЫЕ КБ: НОВЫЕ ГОРИЗОНТЫ И ПЕРСПЕКТИВЫ'}/>
    </div>
    );
};