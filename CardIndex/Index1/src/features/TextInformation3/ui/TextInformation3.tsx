import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation3 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <h2 className={cls.heading}>
                КБ сегодня — цифровая фабрика идей.
            </h2>
            <p className={cls.regularText}>
                Современное КБ — высокотехнологичный центр, где работают специалисты из разных
                областей и используют передовые технологии: от композитных материалов до
                искусственного интеллекта.
            </p>
            <h2 className={cls.heading}>
                Современные КБ
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    ПАО «Туполев» — разрабатывает стратегические истребители и дальнемагистральные самолеты
                </li>
                <li className={cls.listItem}>
                    АО «МиГ» — обновляет семейство истребителей-перехватчиков
                </li>
                <li className={cls.listItem}>
                    АО «Вертолеты России» (Камов и Миль) — объединяет два ведущих вертолетных КБ
                </li>
            </ul>
            <p className={cls.listItem}>
                Все организации входят в состав ОАК («Объединенная авиастроительная корпорация»).
            </p>
            <h2 className={cls.heading}>
                Что изменилось
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    цифровое проектирование: сначала самолет создают «в цифре» — моделируют
                    нагрузки, полет, поведение при отказах
                </li>
                <li className={cls.listItem}>
                    цифровые двойники — виртуальные копии реальных объектов — ускоряют процесс
                    разработки
                </li>
                <li className={cls.listItem}>
                    виртуальные испытания снижают стоимость и количество тестирований
                </li>
                <li className={cls.listItem}>
                    междисциплинарные команды: теперь в КБ работают не только инженеры, но и IT-
                    специалисты, аналитики, дизайнеры
                </li>
            </ul>
            <h2 className={cls.heading}>
                Актуальные проекты
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Су-57 — истребитель 5-го поколения, со стелс-технологиями
                </li>
                <li className={cls.listItem}>
                    МС-21 — новый пассажирский лайнер с композитным крылом
                </li>
                <li className={cls.listItem}>
                    Checkmate — перспективный легкий истребитель для экспортного рынка
                </li>
                <li className={cls.listItem}>
                    ПАК ДА — проект нового стратегического бомбардировщика
                </li>
                <li className={cls.listItem}>
                    беспилотные аппараты: «Орион», «Скат», «Гром» — новейшие БПЛА для армии и
                    гражданских задач
                </li>
            </ul>
            <p className={cls.regularText}>
                КБ России — часть глобального мира: участвуют в международных авиасалонах, проводят
                совместные исследования с зарубежными партнерами
            </p>
        </div>
    );
};