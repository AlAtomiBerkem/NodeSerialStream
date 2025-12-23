import cls from './ExhibitionRoute.module.scss'
import { classNames } from "shared/lib";

interface ExhibitionRouteProps {
    className?: string;
}

export const ExhibitionRoute = ({className}: ExhibitionRouteProps) => {

return (
    <div className={classNames(cls.ExhibitionRoute, {}, [className])}>
        страница с самолетиком
    </div>
    );
};