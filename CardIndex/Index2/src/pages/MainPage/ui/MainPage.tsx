import cls from './MainPage.module.css'
import { classNames } from "shared/lib/classNames";
import NameApp from 'shared/assets/icons/AppName.svg?url';
import StartPhoto from 'shared/assets/icons/startphoto.png'
import Label from 'shared/assets/icons/label.png'
import {LinkGroup} from "features/LinkGroup";

interface MainPageProps {
    className?: string;
}

export const MainPage = ({className}: MainPageProps) => {
    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <div className={cls.scaller}>
            <img src={NameApp} alt="NameApp" className={cls.imgname}/>
            <img src={StartPhoto} alt="Startphoto" className={cls.startphoto}/>
            <img src={Label} alt="Label" className={cls.label}/>
                <LinkGroup className={cls.goupbtn}/>
            </div>
        </div>
    );
};