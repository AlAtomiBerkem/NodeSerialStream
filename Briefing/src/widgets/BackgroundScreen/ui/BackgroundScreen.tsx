import cls from './BackgroundScreen.module.css'
import { classNames } from "shared/lib";
import Background from 'shared/assets/backgroundScreen.png'

interface BackgroundScreenProps {
    className?: string;
    children?: React.ReactNode
}

export const BackgroundScreen = (props: BackgroundScreenProps) => {

const {
    children,
    className,
} = props

return (
    <div className={classNames(cls.BackgroundScreen, {}, [className])}>
        <img src={Background} alt="Loading..." className={cls.backgroundImage}/>
        <div className={cls.content}>
            {children}
        </div>
    </div>
    );
};