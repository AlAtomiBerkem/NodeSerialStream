import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation1 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <h2 className={cls.heading}>
                От разведки к ударам
            </h2>
            <p className={cls.regularText}>
                Беспилотные летательные аппараты (БПЛА) прошли путь от простых разведчиков до
                <br/>
                многофункциональных систем, способных вести наблюдение, наносить удары, передавать
                <br/>
                данные и даже осуществлять посадки и дозаправку. Сегодня они становятся неотъемлемой
                <br/>
                частью авиации.
            </p>
            <h2 className={cls.heading}>
                Примеры:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    «Воробей» — военный многоцелевой беспилотник, отличается компактностью
                </li>
                <li className={cls.listItem}>
                    «Скат» — проект ударного беспилотника с малозаметным дизайном
                </li>
                <li className={cls.listItem}>
                    «Орион» — серийный разведывательно-ударный БПЛА, способен находиться в
                    воздухе до 24 ч
                </li>
                <li className={cls.listItem}>
                    «Гром» — беспилотник сопровождения, рассчитан на взаимодействие с пилотируемыми истребителями.
                </li>
            </ul>
            <h2 className={cls.heading}>
                Гражданские применения:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Geoscan, Zala Aero — экологический мониторинг, картография, доставка грузов,
                    контроль инфраструктуры;
                </li>
                <li className={cls.listItem}>
                    ИД-100А - автономной беспилотной платформы высокой грузоподъемности с
                    уникальной аэродинамической схемой.
                </li>
            </ul>
        </div>
    );
};