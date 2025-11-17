import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation2 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <p className={cls.regularText}>
                Двигатель — сердце летательного аппарата. Это основная силовая установка, которая
                преобразует энергию топлива в кинетическую энергию, необходимую для движения
                летательного аппарата.
            </p>
            <h2 className={cls.heading}>
                ПАО «ОДК-Сатурн» (Рыбинск)
            </h2>
            <h2 className={cls.heading}>
                Изделия:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    ПД-8 — турбовентиляторный двигатель для SSJ New
                </li>
                <li className={cls.listItem}>
                    СаМ146 — совместно с Safran, используется на SSJ100
                </li>
                <li className={cls.listItem}>
                    Д-30КП, Д-30КУ — транспортные истребительные самолеты (Ил-76, МиГ-31)
                </li>
            </ul>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    лидер в производстве гражданских двигателей
                </li>
                <li className={cls.listItem}>
                    один из ключевых участников программы импортозамещения
                </li>
                <li className={cls.listItem}>
                    большой опыт в производстве газотурбинных установок для энергетики и флота
                </li>
            </ul>
            <h2 className={cls.heading}>
                ОДК-Климов (Санкт-Петербург)
            </h2>
            <h2 className={cls.heading}>
                Изделия:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    РД-33 — двигатель для МиГ-29;
                </li>
                <li className={cls.listItem}>
                    Климов ТВ7-117СТ — для Ил-114, Ил-112
                </li>
                <li className={cls.listItem}>
                    ВК-2500 — для вертолетов Ми и Ка
                </li>
            </ul>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    специализация на двигателях малой и средней тяги, включая вертолетные установки
                </li>
                <li className={cls.listItem}>
                    разработка и производство турбовальных двигателей
                </li>
                <li className={cls.listItem}>
                    исторически сильная инженерная школа с наследием от В.Я. Климова
                </li>
            </ul>
            <h2 className={cls.heading}>
                ПАО «ОДК-Пермские моторы» (Пермь)
            </h2>
            <h2 className={cls.heading}>
                Изделия:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    ПД-14 — перспективный двигатель для МС-21
                </li>
                <li className={cls.listItem}>
                    ПС-90А — для Ил-96, Ту-204
                </li>
                <li className={cls.listItem}>
                    ПД-35 (в разработке) — для тяжелых дальнемагистральных самолетов
                </li>
            </ul>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    флагман нового поколения гражданских двигателей
                </li>
                <li className={cls.listItem}>
                    производство ПС-90А — первого серийного двигателя, сертифицированного по
                    ICAO
                </li>
                <li className={cls.listItem}>
                    активное внедрение цифрового проектирования и аддитивных технологий
                </li>
            </ul>
            <h2 className={cls.heading}>
                ММП имени В.В. Чернышева (Москва)
            </h2>
            <h2 className={cls.heading}>
                Изделия:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    серийное производство РД-33, РД-93 (МиГ-29, JF-17 Thunder)
                </li>
                <li className={cls.listItem}>
                    компоненты для двигателей ПД-14, ПД-8
                </li>
            </ul>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    специализация на финальной сборке и испытаниях турбореактивных двигателей
                </li>
                <li className={cls.listItem}>
                    входит в кооперацию по сборке боевых двигателей малой тяги
                </li>
                <li className={cls.listItem}>
                    высокоточная механообработка и контроль качества
                </li>
            </ul>
            <h2 className={cls.heading}>
                УМПО — Уфимское моторостроительное производственное объединение
            </h2>
            <h2 className={cls.heading}>
                Изделия:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    АЛ-31Ф, АЛ-41Ф1С — семейство двигателей для Су-27, Су-30, Су-35
                </li>
                <li className={cls.listItem}>
                    элементы для двигателя «изделие 30» (для Су-57)
                </li>
                <li className={cls.listItem}>
                    компоненты вертолетных и гражданских двигателей
                </li>
            </ul>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    флагман боевой авиации России, двигатели 4-го и 5-го поколения
                </li>
                <li className={cls.listItem}>
                    один из самых высокотехнологичных заводов ОДК
                </li>
                <li className={cls.listItem}>
                    производство полнокомплектных силовых установок с форсажной камерой.
                </li>
            </ul>
            <h2 className={cls.heading}>
                НПЦ газотурбостроения «Салют» (Москва)
            </h2>
            <h2 className={cls.heading}>
                Изделия:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    АЛ-31Ф, АЛ-21Ф — модернизация и ремонт
                </li>
                <li className={cls.listItem}>
                    компоненты для новых двигателей: ПД-14, «изделие 30»
                </li>
            </ul>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    центр модернизации и капитального ремонта
                </li>
                <li className={cls.listItem}>
                    историческое участие в разработке двигателей для Су-24, Су-27
                </li>
                <li className={cls.listItem}>
                    концентрация на опытных и научно-исследовательских работах
                </li>
            </ul>
        </div>
    );
};