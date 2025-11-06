import cls from './TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation1 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
         <p className={cls.regularText}>
             Научно-исследовательские институты (НИИ) — центры, где создаются, проверяются и
             совершенствуются научные основы авиации. Они не строят самолеты, но именно здесь
             рождаются технологии, без которых невозможно их проектировать и выпускать.
         </p>
            <h2 className={cls.heading}>
                НИИ занимаются
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    испытаниями новых конструкций: от нагрузок на крыло до вибраций при посадке
                </li>
                <li className={cls.listItem}>
                    аэродинамическими расчетами: как лучше обтекать воздух, чтобы летать быстрее и
                    экономичнее
                </li>
                <li className={cls.listItem}>
                    разработкой новых материалов: легких, прочных, термостойких, включая
                    композиты и сплавы
                </li>
            </ul>
            <h2 className={cls.heading}>
                Отличие НИИ от КБ и заводов
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    НИИ — создают научную базу и технологии
                </li>
                <li className={cls.listItem}>
                    КБ — используют полученные данные для проектирования летательных аппаратов
                </li>
                <li className={cls.listItem}>
                    Заводы — производят изделия
                </li>
            </ul>
            <p className={cls.regularText}>
                Так формируется единая цепочка: наука → проект → производство.
            </p>
        </div>
    );
};