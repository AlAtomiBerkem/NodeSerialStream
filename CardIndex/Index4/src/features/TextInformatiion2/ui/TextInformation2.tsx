import cls from './TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation2 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <h2 className={cls.heading}>
                Основные авиастроительные предприятия России
            </h2>
            <p className={cls.regularText}>
                Авиазаводы расположены в разных частях России, что обеспечивает стратегическое
                распределение мощностей: Дальний Восток (КнААЗ), Сибирь (ИАЗ, НАЗ), Поволжье (КАЗ,
                УАЗ) и Центральная Россия (ВАСО).
            </p>
            <h2 className={cls.heading}>
                КнААЗ (Комсомольск-на-Амуре)
            </h2>
            <p className={cls.regularText}>
                современный и закрытый завод по производству
                боевой авиации, имеет собственные испытательные аэродромы и цеха полного цикла.
            </p>
            <h2 className={cls.heading}>
                Самолеты:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Су-35 — многофункциональный истребитель поколения 4++
                </li>
                <li className={cls.listItem}>
                    Су-57 — истребитель пятого поколения
                </li>
                <li className={cls.listItem}>
                    SSJ New — российская модификация регионального самолета Sukhoi Superjet
                </li>
            </ul>
            <h2 className={cls.heading}>
                ИАЗ (Иркутский авиационный завод)
            </h2>
            <p className={cls.regularText}>
                центр гражданского авиастроения нового
                поколения, активно внедряет композиты и цифровое производство. Один из пилотных
                заводов ОАК по импортозамещению.
            </p>
            <h2 className={cls.heading}>
                Самолеты:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Су-30СМ — истребитель с высокой маневренностью, эксплуатируется ВКС России
                    и за рубежом
                </li>
                <li className={cls.listItem}>
                    Як-130 — учебно-боевой самолет для подготовки летчиков
                </li>
                <li className={cls.listItem}>
                    МС-21 — новейший магистральный лайнер на замену Boeing/Airbus в среднем
                    сегменте
                </li>
            </ul>
            <h2 className={cls.heading}>
                ВАСО (Воронежский авиазавод)
            </h2>
            <p className={cls.listItem}>
                один из старейших заводов, специализирующийся на
                крупных фюзеляжах и опытной сборке.
            </p>
            <h2 className={cls.heading}>
                Самолеты:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Ил-96 — широкофюзеляжный дальнемагистральный лайнер
                </li>
                <li className={cls.listItem}>
                    Ил-112 — легкий транспортный самолет
                </li>
                <li className={cls.listItem}>
                    Ил-114 — региональный турбовинтовой самолет
                </li>
            </ul>
            <h2 className={cls.heading}>
                КАЗ (Казанский авиационный завод им. Горбунова)
            </h2>
            <p className={cls.regularText}>
                главный производитель
                стратегической авиации. Завод сохраняет технологии тяжелого лонжеронного монтажа и
                глубокую модернизацию бомбардировщиков.
            </p>
            <h2 className={cls.heading}>
                Самолеты:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Ту-160М — модернизированный стратегический ракетоносец
                </li>
                <li className={cls.listItem}>
                    Ту-214 — среднемагистральный пассажирский самолет
                </li>
                <li className={cls.listItem}>
                    Ту95МС — единственный в мире стратегический бомбардировщик с
                    турбовинтовыми двигателями
                </li>
                <li className={cls.listItem}>
                    Ту22М3М — дальний сверхзвуковой ракетоносец-бомбардировщик с крылом
                    изменяемой стреловидности
                </li>
            </ul>
            <h2 className={cls.heading}>
                УАЗ (Ульяновский авиазавод)
            </h2>
            <p className={cls.regularText}>
                производит грузовую и военную авиацию, в том числе
                самолеты для МЧС и ВКС. Завод обладает крупнейшими цехами для сборки фюзеляжей и
                фюзеляжных отсеков.
            </p>
            <h2 className={cls.heading}>
                Самолеты:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Ил-76МД-90А — тяжелый военно-транспортный самолет
                </li>
            </ul>
            <h2 className={cls.heading}>
                НАЗ (Новосибирский авиационный завод им. Чкалова)
            </h2>
            <p className={cls.regularText}>
                один из ведущих заводов по
                производству фронтовой авиации и авионики. Также участвует в инновационных
                программах по беспилотным летательным аппаратам.
            </p>
            <h2 className={cls.heading}>
                Самолеты:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Су-34 — фронтовой бомбардировщик, универсальный ударный самолет
                </li>
                <li className={cls.listItem}>
                    БПЛА (в кооперации с другими предприятиями)
                </li>
            </ul>
        </div>
    );
};