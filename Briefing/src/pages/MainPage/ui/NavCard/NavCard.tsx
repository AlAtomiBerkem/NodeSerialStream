import { classNames } from "shared/lib";
import cls from './NavCard.module.scss';
import CardPattern from 'shared/assets/card_pattern.svg';
import ArrowIcon from 'shared/assets/arrow_right.svg';

interface NavCardProps {
    className?: string;
    title: string;
    description: string;
    onClick?: () => void;
    showArrow?: boolean;
}

export const NavCard = (props: NavCardProps) => {
    const {
        className,
        title,
        description,
        onClick,
        showArrow = true,
    } = props;

    return (
        <div className={classNames(cls.NavCard, {}, [className])} onClick={onClick}>
            <div className={cls.background} style={{ backgroundImage: `url(${CardPattern})` }} />

            <div className={cls.content}>
                <h2 className={cls.title}>{title}</h2>
                <p className={cls.description}>{description}</p>
            </div>

            {showArrow && (
                <img src={ArrowIcon} className={cls.arrow} alt="Arrow" />
            )}
        </div>
    );
};
