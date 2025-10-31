import cls from './TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <p className={cls.regularText}>
                Именно в КБ происходит путь от замысла до летающей машины.
                Это не только чертёж и расчёты – это целая система, включающая инженеров,
                математиков, программистов, аэродинамиков и испытателей
            </p>
            <h2 className={cls.heading}>
                ЧТО ДЕЛАЕТ КБ?
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Проектирует новую авиационную технику: истребители, бомбардировщики,
                    пассажирские лайнеры, беспилотники
                </li>
                <li className={cls.listItem}>
                    Разрабатывает аэродинамические и конструкционные схемы
                </li>
                <li className={cls.listItem}>
                    Проводит расчёты прочности, устойчивости, управляемости
                </li>
                <li className={cls.listItem}>
                    Создаёт опытные образцы для испытаний
                </li>
                <li className={cls.listItem}>
                    Участвует в доработке серийных машин
                </li>
                <li className={cls.listItem}>
                    Внедряет инновации – от композитных материалов до цифрового проектирования
                </li>
            </ul>
            <h2 className={cls.heading}>
                ИСТОРИЯ КБ В РОССИИ
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Первые КБ появились в 1920-х годах, чаще назывались "бригадами" при авиазаводах
                </li>
                <li className={cls.listItem}>
                    В 1930–1940-х сформировались знаменитые ОКБ: Туполева, Ильюшина, Яковлева, Лавочкина
                </li>
            </ul>
        </div>
    );
};