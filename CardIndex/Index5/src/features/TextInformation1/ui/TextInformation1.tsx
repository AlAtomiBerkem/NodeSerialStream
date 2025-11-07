import cls from './TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation1 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <h2 className={cls.heading}>
                МиГ-29
            </h2>
            <p className={cls.regularText}>
                Тип: многоцелевой истребитель 4 поколения.
                <br/>
                Первый полет: 1977 г.
                <br/>
                Характеристики: макс. скорость — 2 400 км/ч, дальность — 1 500 км, потолок — 18 000 м.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    высокая маневренность и надежность
                </li>
                <li className={cls.listItem}>
                    используется более чем в 25 странах
                </li>
                <li className={cls.listItem}>
                    применялся в боевых действиях с 1980-х годов
                </li>
                <li className={cls.listItem}>
                    основа палубной авиации ВМФ (в версии МиГ-29К)
                </li>
            </ul>
            <h2 className={cls.heading}>
                Су-27
            </h2>
            <p className={cls.regularText}>
                Тип: тяжелый истребитель завоевания превосходства в воздухе.
                <br/>
                Первый полет: 1977 г.
                <br/>
                Характеристики: макс. скорость — 2 500 км/ч, дальность — 3 530 км.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    один из самых маневренных самолетов в мире
                </li>
                <li className={cls.listItem}>
                    основа семейства: Су-30, Су-33, Су-35
                </li>
                <li className={cls.listItem}>
                    используется до сих пор на службе ВКС России и других стран
                </li>
                <li className={cls.listItem}>
                    участвовал в тренировках и учениях по всему миру
                </li>
            </ul>
            <h2 className={cls.heading}>
                Ил-76
            </h2>
            <p className={cls.regularText}>
                Тип: тяжелый военно-транспортный самолет.
                <br/>
                Первый полет: 1971 г.
                <br/>
                Характеристики: грузоподъемность — до 60 т, дальность — до 5 000 км
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    основа МЧС, ВКС и гуманитарных миссий
                </li>
                <li className={cls.listItem}>
                    высокая живучесть, возможность работы с грунта
                </li>
                <li className={cls.listItem}>
                    модификации: А-50 (летающий радар), танкеры, госпитали
                </li>
            </ul>
            <h2 className={cls.heading}>
                Ту-160
            </h2>
            <p className={cls.regularText}>
                Тип: стратегический сверхзвуковой бомбардировщик-ракетоносец.
                <br/>
                Первый полет: 1981 г.
                <br/>
                Характеристики: максимальная скорость — до 2 200 км/ч, дальность — до 14 000 км,
                <br/>
                боевая нагрузка — до 45 т
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    самый крупный и мощный боевой самолет в мире
                </li>
                <li className={cls.listItem}>
                    сверхзвуковая скорость полета при изменяемой стреловидности крыла
                </li>
                <li className={cls.listItem}>
                    несет до 12 крылатых ракет большой дальности
                </li>
                <li className={cls.listItem}>
                    прозвище: «Белый лебедь» — за элегантные формы и белую окраску
                </li>
            </ul>
        </div>
    );
};