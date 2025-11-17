import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation2 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <h2 className={cls.heading}>
                Ан-22 «Антей»
            </h2>
            <p className={cls.regularText}>
                Тип: тяжелый военно-транспортный самолет.
                <br/>
                Первый полет: 1965 г.
                <br/>
                Производство: Воронежский авиационный завод (ВАСО)
                <br/>
                Характеристики: грузоподъемность — до 80 т, дальность — до 5 000 км, размах крыла
                — 64,4 м.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    первый в мире широкофюзеляжный турбовинтовой транспортник
                </li>
                <li className={cls.listItem}>
                    на момент создания — самый крупный самолет в мире
                </li>
                <li className={cls.listItem}>
                    четыре турбовинтовых двигателя с восьмилопастными соосными винтами
                </li>
                <li className={cls.listItem}>
                    перевозил танки, вертолеты, ракеты и гуманитарные грузы
                </li>
                <li className={cls.listItem}>
                    использовался в уникальных миссиях, включая полеты в Антарктиду
                </li>
            </ul>
            <h2 className={cls.heading}>
                Ил-62
            </h2>
            <p className={cls.regularText}>
                Тип: дальнемагистральный пассажирский самолет.
                <br/>
                Первый полет: 1963 г.
                <br/>
                Характеристики: дальность — 10 000 км, кол-во пассажиров — до 186
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    первый дальнемагистральный лайнер СССР
                </li>
                <li className={cls.listItem}>
                    летал в Европу, Азию, Америку
                </li>
                <li className={cls.listItem}>
                    символ международного престижа Аэрофлота
                </li>
                <li className={cls.listItem}>
                    отличался задним расположением двигателей и высокой дальностью
                </li>
            </ul>
            <h2 className={cls.heading}>
                Ан-124 «Руслан»
            </h2>
            <p className={cls.regularText}>
                Тип: тяжелый транспортный самолет.
                <br/>
                Первый полет: 1982 г.
                <br/>
                Характеристики: грузоподъемность — до 150 тонн, дальность — до 4 800 км с макс.
                грузом.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    второй по грузоподъемности самолет в мире
                </li>
                <li className={cls.listItem}>
                    используется для перевозки танков, спутников, турбин
                </li>
                <li className={cls.listItem}>
                    участвует в международных грузоперевозках
                </li>
                <li className={cls.listItem}>
                    возможность загрузки через носовой люк
                </li>
            </ul>
            <h2 className={cls.heading}>
                SSJ100 (Superjet 100)
            </h2>
            <p className={cls.regularText}>
                Тип: региональный пассажирский самолет
                <br/>
                Первый полет: 2008 г.
                <br/>
                Характеристики: вместимость —до 100 человек, дальность — 3 000 км.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    первый российский пассажирский самолет с 1990-х
                </li>
                <li className={cls.listItem}>
                    разработан с международным участием
                </li>
                <li className={cls.listItem}>
                    используется Аэрофлотом, Росгвардией, иностранными компаниями
                </li>
                <li className={cls.listItem}>
                    сейчас развивается версия SSJ-New с российскими комплектующими
                </li>
            </ul>
        </div>
    );
};