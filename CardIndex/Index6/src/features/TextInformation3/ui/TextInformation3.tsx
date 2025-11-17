import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation3 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <h2 className={cls.heading}>
                Где заканчивается авиация и начинается космос
            </h2>
            <p className={cls.regularText}>
                Авиационно-космические комплексы нового поколения
                <br/>
                микрогравитационных экспериментов, вывода малых спутников и даже космического
                туризма.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    многоразовость
                </li>
                <li className={cls.listItem}>
                    унификация и технологическая простота
                </li>
                <li className={cls.listItem}>
                    модульность и адаптивность
                </li>
                <li className={cls.listItem}>
                    воздушный старт и автономное возвращение
                </li>
            </ul>
            <p className={cls.regularText}>
                Эти разработки представляют новое поколение российских авиационно-космических
                систем, ориентированных на:
            </p>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    снижение стоимости выведения полезных нагрузок
                </li>
                <li className={cls.listItem}>
                    повышение надежности и экологичности
                </li>
                <li className={cls.listItem}>
                    интеграцию авиационных и космических технологий
                </li>
            </ul>
            <p className={cls.regularText}>
                Они формируют основу будущих пилотируемых и автоматических миссий России в
                ближний и дальний космос.
            </p>
            <h2 className={cls.heading}>
                Разработки:
            </h2>
            <p className={cls.regularText}>
                Ракета-носитель «Союз-5»
                <br/>
                Разработчик: ЦСКБ-Прогресс (Россия)
                <br/>
                Тип: двухступенчатая ракета-носитель среднего класса
                <br/>
                Первый полет (план): после 2026 г.
            </p>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    простая и надежная конструкция: число деталей и узлов вдвое меньше, чем у «Союз-
                    2»
                </li>
                <li className={cls.listItem}>
                    использует экологически чистое топливо — сжиженный природный газ (СПГ)
                </li>
                <li className={cls.listItem}>
                    новый тип двигателя — повышенный КПД и меньшая токсичность выхлопа
                </li>
                <li className={cls.listItem}>
                    предназначена для вывода спутников и пилотируемых кораблей на орбиту
                </li>
            </ul>
            <h2 className={cls.heading}>
                Модификации:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Союз-5.1 — средний класс, стартовая масса ~270 т, полезная нагрузка: 9,2 т
                </li>
                <li className={cls.listItem}>
                    Союз-5.2 — двухступенчатая с 2 бустерными блоками, полезная нагрузка: 16,5 т
                </li>
                <li className={cls.listItem}>
                    Союз-5.3 — трехступенчатая версия с 2 бустерами, полезная нагрузка: 26,5 т
                </li>
            </ul>
            <h2 className={cls.heading}>
                Преимущества:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    дешевое производство и обслуживание
                </li>
                <li className={cls.listItem}>
                    возможность повторного использования элементов
                </li>
                <li className={cls.listItem}>
                    повышенная экологичность и безопасность запусков
                </li>
            </ul>
            <h2 className={cls.heading}>
                Космический корабль «Клипер»
            </h2>
            <p className={cls.regularText}>
                Разработчик: РКК «Энергия».
                <br/>
                Тип: многоразовый пилотируемый космический корабль.
                <br/>
                Экипаж: до 6 человек.
            </p>
            <h2 className={cls.heading}>
                Назначение:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    доставка экипажа и грузов на низкую околоземную орбиту
                </li>
                <li className={cls.listItem}>
                    обслуживание орбитальных станций
                </li>
                <li className={cls.listItem}>
                    проведение спасательных и исследовательских миссий
                </li>
            </ul>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    многоразовая конструкция — до 25 полетов без капитального ремонта
                </li>
                <li className={cls.listItem}>
                    планирующей посадки на аэродром, как у самолета
                </li>
                <li className={cls.listItem}>
                    просторный обитаемый отсек — в 2 раза больше, чем у корабля «Союз»
                </li>
                <li className={cls.listItem}>
                    потенциал для дальних космических полетов
                </li>
            </ul>
            <h2 className={cls.heading}>
                Преимущества:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    снижение стоимости полетов за счет повторного использования
                </li>
                <li className={cls.listItem}>
                    комфортные условия для экипажа
                </li>
                <li className={cls.listItem}>
                    требуется меньше времени на подготовки к запуску
                </li>
            </ul>
            <h2 className={cls.heading}>
                МАКС — Многоцелевая авиационно-космическая система
            </h2>
            <p className={cls.regularText}>
                Разработчик: НПО «Молния».
                <br/>
                Главный конструктор: Г. Е. Лозино-Лозинский.
                <br/>
                Тип: система воздушного старта.
            </p>
            <h2 className={cls.heading}>
                Состав комплекса:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    самолет-носитель (на базе Ан-225 или Ан-124)
                </li>
                <li className={cls.listItem}>
                    орбитальный ракетоплан, выведенный в стратосферу
                </li>
            </ul>
            <h2 className={cls.heading}>
                Принцип работы:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    самолет-носитель поднимает ракетоплан на высоту 8–10 км
                </li>
                <li className={cls.listItem}>
                    ракетоплан отделяется и с помощью собственного двигателя выходит на орбиту
                </li>
                <li className={cls.listItem}>
                    после миссии он возвращается планирующим спуском и садится на аэродром
                </li>
            </ul>
            <h2 className={cls.heading}>
                Особенности и преимущества:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    воздушный старт экономит топливо и снижает нагрузку на ступени
                </li>
                <li className={cls.listItem}>
                    запуск с любого аэродрома
                </li>
                <li className={cls.listItem}>
                    использование наработок проектов «Спираль» и «Буран»
                </li>
            </ul>
            <h2 className={cls.heading}>
                Преимущества:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    сокращение затрат на инфраструктуру
                </li>
                <li className={cls.listItem}>
                    повторное использование аппарата
                </li>
                <li className={cls.listItem}>
                    высокая оперативность запусков
                </li>
            </ul>
            <h2 className={cls.heading}>
                «Байкал-Ангара» — многоразовая космическая система
            </h2>
            <p className={cls.regularText}>
                Разработчики: ГКНПЦ им. Хруничева и НПО «Молния».
                <br/>
                Тип: ракета-носитель с возвращаемым ускорителем.
            </p>
            <h2 className={cls.heading}>
                Состав комплекса:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    ракета-носитель «Ангара»
                </li>
                <li className={cls.listItem}>
                    многоразовый ускоритель МРУ «Байкал»
                </li>
            </ul>
            <h2 className={cls.heading}>
                Особенности:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    МРУ оснащен собственными ЖРД, системой крыльев и шасси
                </li>
                <li className={cls.listItem}>
                    после отделения от ракеты ускоритель выполняет аэродинамический маневр,
                    торможение и возвращается на аэродром
                </li>
                <li className={cls.listItem}>
                    скорость отделения — до 5,6 Маха
                </li>
                <li className={cls.listItem}>
                    система рассчитана на десятки повторных запусков
                </li>
            </ul>
            <h2 className={cls.heading}>
                Преимущества:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    снижение стоимости вывода полезной нагрузки
                </li>
                <li className={cls.listItem}>
                    повышение безопасности и управляемости
                </li>
                <li className={cls.listItem}>
                    возможность запусков на орбиты с любым наклонением (всеазимутальность)
                </li>
                <li className={cls.listItem}>
                    экологически чистое топливо
                </li>
            </ul>
            <p className={cls.regularText}>
                «Первые ракетчики были из авиации. Мы выросли на авиации, мы переняли все лучшее
                от нее. Авиация — это мать космонавтики».
                Б.Е. Черток, — советский и российский ученый-конструктор, один из ближайших соратников С. П.
                Королева. «Ракеты и люди», т. 1
            </p>
        </div>
    );
};