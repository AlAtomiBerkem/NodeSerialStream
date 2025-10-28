import cls from './FirstPage.module.css'
import { classNames } from "shared/lib/classNames";

interface FirstPageProps {
    className?: string;
}

export const FirstPage = ({className}: FirstPageProps) => {

return (
    <div className={classNames(cls.FirstPage, {}, [className])}>

    </div>
    );
};
