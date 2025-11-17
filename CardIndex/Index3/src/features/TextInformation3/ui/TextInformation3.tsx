import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation3 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <p className={cls.regularText}>
                Разработки НИИ формируют основу для современных гражданских и военных самолетов,
                беспилотных систем и гиперзвуковых аппаратов.
            </p>
            <h2 className={cls.heading}>
                Ключевые разработки
            </h2>
            <h2 className={cls.heading}>
                Аэродинамические трубы
            </h2>
            <p className={cls.regularText}>
                ЦАГИ располагает одними из крупнейших аэродинамических труб в мире
            </p>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    модели обдуваются воздушным потоком при разных скоростях
                </li>
                <li className={cls.listItem}>
                    позволяют протестировать крыло или фюзеляж до стадии реального самолета
                </li>
                <li className={cls.listItem}>
                    применяется даже в автоспорте и архитектуре
                </li>
            </ul>
            <h2 className={cls.heading}>
                Новые материалы
            </h2>
            <p className={cls.regularText}>
                ВИАМ разрабатывает сверхлегкие и сверхпрочные материалы
            </p>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    композиты, способные выдерживать температуры выше 1000°C
                </li>
                <li className={cls.listItem}>
                    сплавы для турбин, элементы с самозалечивающимися покрытиями
                </li>
                <li className={cls.listItem}>
                    легкие материалы повышают топливную эффективность на 10–15%
                </li>
            </ul>
        </div>
    );
};