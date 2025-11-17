import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation1 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <h2 className={cls.heading}>
                Проектирование
            </h2>
            <p className={cls.regularText}>
                Начинается в КБ. Здесь инженеры создают 3D-модели, расчеты прочности, аэродинамики,
                схемы электрики, гидравлики, систем управления.
            </p>
            <h2 className={cls.heading}>
                Подбор и подготовка материалов
            </h2>
            <p className={cls.regularText}>
                На завод поступают листы композитов, алюминиевых и титано-сплавов, из которых
                вырезаются и формуются детали.
            </p>
            <h2 className={cls.heading}>
                Изготовление компонентов
            </h2>
            <p className={cls.regularText}>
                Станки с числовым программным управлением (ЧПУ) обрабатывают детали с высокой
                точностью. На отдельных участках изготавливаются крылья, фюзеляж, шасси, пилон,
                обшивка.
            </p>
            <h2 className={cls.heading}>
                Сборка
            </h2>
            <p className={cls.regularText}>
                В цехах крупной сборки соединяют основные элементы: «женят» фюзеляж с крыльями,
                устанавливают двигатели, проводку, системы.
            </p>
            <h2 className={cls.heading}>
                Испытания
            </h2>
            <p className={cls.regularText}>
                Каждый самолет проходит статические, вибрационные и летные испытания. Проверяются
                безопасность, управляемость, вибрации, герметичность и электрика.
            </p>
            <h2 className={cls.heading}>
                Производственные участки и методы:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    цехи механообработки: создание деталей из металла
                </li>
                <li className={cls.listItem}>
                    композитные участки: работа с легкими прочными материалами
                </li>
                <li className={cls.listItem}>
                    линии окончательной сборки: как на конвейере, но для самолетов
                </li>
                <li className={cls.listItem}>
                    испытательные станции: лаборатории, ангарные проверки и аэродром
                </li>
            </ul>
        </div>
    );
};