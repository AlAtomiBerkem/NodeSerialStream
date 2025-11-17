import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation3 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <h2 className={cls.heading}>
                Е-155 (прототип МиГ-25)
            </h2>
            <p className={cls.regularText}>
                Тип: экспериментальный сверхзвуковой самолет-перехватчик.
                <br/>
                Первый полет: 1964 г.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    разрабатывался в условиях гонки скоростей с США (ответ на XB-70 Valkyrie)
                </li>
                <li className={cls.listItem}>
                    освоил полеты на высоте до 30 км со скоростью свыше 3 000 км/ч
                </li>
                <li className={cls.listItem}>
                    стал базой для серийного МиГ-25, который до сих пор держит рекорды по скорости
                    и высоте
                </li>
                <li className={cls.listItem}>
                    внес огромный вклад в материалы, аэродинамику и системы охлаждения
                </li>
            </ul>
            <h2 className={cls.heading}>
                Би-1
            </h2>
            <p className={cls.regularText}>
                Тип: первый советский ракетоплан (истребитель).
                <br/>
                Первый полет: 1942 г.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    один из первых в мире пилотируемых самолетов с ракетным двигателем
                </li>
                <li className={cls.listItem}>
                    разрабатывался для борьбы с высотными бомбардировщиками
                </li>
                <li className={cls.listItem}>
                    испытывался во время Великой Отечественной войны
                </li>
            </ul>
            <h2 className={cls.heading}>
                «Спираль»
            </h2>
            <p className={cls.regularText}>
                Тип: авиационно-космическая система.
                <br/>
                Разработка: 1960–70-е гг.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    двухступенчатый комплекс: гиперзвуковой разгонщик и орбитальный самолет
                </li>
                <li className={cls.listItem}>
                    использовала технологию «воздушного старта»
                </li>
                <li className={cls.listItem}>
                    орбитальный самолет — многоразовый, предназначен для разведки и перехвата
                    целей
                </li>
                <li className={cls.listItem}>
                    демонстратор проекта — МиГ-105 («Лапоть»)
                </li>
            </ul>
            <h2 className={cls.heading}>
                Принцип работы:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    разгонщик поднимал орбитальный самолет на высоту до 130–150 км и отделял его
                </li>
                <li className={cls.listItem}>
                    далее аппарат с помощью ракетной ступени выходил на орбиту
                </li>
                <li className={cls.listItem}>
                    после выполнения задачи возвращался на Землю, планируя и садясь как обычный
                    самолет
                </li>
            </ul>
            <h2 className={cls.heading}>
                Экранопланы (проекты Р. Е. Алексеева)
            </h2>
            <p className={cls.regularText}>
                Тип: транспортные средства на воздушной подушке над поверхностью воды.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    использовали эффект «прижимания» к поверхности
                </li>
                <li className={cls.listItem}>
                    летали на высоте 1–4 м со скоростью до 500 км/ч
                </li>
                <li className={cls.listItem}>
                    применялись в Каспийской флотилии
                </li>
                <li className={cls.listItem}>
                    проект «Лунь» — самый известный, носитель ракет
                </li>
            </ul>
        </div>
    );
};