import cls from './LoadingScreen.module.css'
import { classNames } from "shared/lib/classNames";
import Fallback from 'shared/assets/screens/fallback.png'

interface LoadingScreenProps {
    className?: string;
}

export const LoadingScreen = ({className}: LoadingScreenProps) => {
    return (
        <div className={classNames(cls.LoadingScreen, {}, [className])}>
            <img src={Fallback} alt="Loading..."/>
        </div>
    );
};