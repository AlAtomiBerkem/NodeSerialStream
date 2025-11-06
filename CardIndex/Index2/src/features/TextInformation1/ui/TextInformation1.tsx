import cls from './TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation1 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
           <p className={cls.regularText}>
               Авиастроение — сложная и высокотехнологичная отрасль, требующая множество
               специалистов: конструкторов, технологов, испытателей, экспертов по материалам,
               системам и автоматизации. Такие кадры готовят специализированные технические вузы,
               история которых уходит в середину XX-го века, а у некоторых — еще раньше.
           </p>
            <h2 className={cls.heading}>
                Главные авиационные университеты России
            </h2>
            <p className={cls.regularText}>
                Все учреждения — часть единой системы, где каждый регион готовит кадры для своего
                авиационного кластера: Восток, Центр, Юг, Сибирь. Вместе они обеспечивают полное
                покрытие потребностей отрасли.
            </p>
            <h2 className={cls.heading}>
                Казанский национальный исследовательский технический университет имени А.Н.
                Туполева (КНИТУ-КАИ)
            </h2>
            <p className={cls.regularText}>
                Казань | Основан в 1932 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    один из старейших авиационных вузов страны
                </li>
                <li className={cls.listItem}>
                    участие в разработке самолетов Ту, МиГ и вертолетов Ми
                </li>
                <li className={cls.listItem}>
                    базовый вуз для Камского авиационного производственного объединения
                </li>
                <li className={cls.listItem}>
                    сильная инженерная школа и современные лаборатории
                </li>
                <li className={cls.listItem}>
                    активное СКБ, клуб дельтапланеристов, учебные аэродромы
                </li>
            </ul>
            <h2 className={cls.heading}>
                Московский авиационный институт (МАИ)
            </h2>
            <p className={cls.regularText}>
                Москва | Основан в 1930 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    крупнейший авиационный университет России
                </li>
                <li className={cls.listItem}>
                    подготовил более 160 000 инженеров
                </li>
                <li className={cls.listItem}>
                    партнер ОАК, Роскосмоса, Сухого, МИГа
                </li>
                <li className={cls.listItem}>
                    свой аэродром, научные и учебные полигоны
                </li>
                <li className={cls.listItem}>
                    студенты разрабатывают спутники и ракеты
                </li>
            </ul>
            <h2 className={cls.heading}>
                Самарский национальный исследовательский университет имени академика С.П.
                Королева (Самарский университет)
            </h2>
            <p className={cls.regularText}>
                Самара | Основан в 1942 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    специализируется на аэрокосмических технологиях
                </li>
                <li className={cls.listItem}>
                    специализируется на аэрокосмических технологиях
                </li>
                <li className={cls.listItem}>
                    связан с производством ракет «Союз» и двигателей НК
                </li>
                <li className={cls.listItem}>
                    сотрудничество с РКЦ «Прогресс»
                </li>
                <li className={cls.listItem}>
                    развиты направления двигателестроения и композитных материалов
                </li>
            </ul>
            <h2 className={cls.heading}>
                Сибирский государственный университет науки и технологий им. академика М.Ф.
                Решетнева (СибГУ)
            </h2>
            <p className={cls.regularText}>
                Красноярск | Основан в 1960 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    центр подготовки инженеров Восточной Сибири
                </li>
                <li className={cls.listItem}>
                    научные работы в области авиа- и ракетостроения
                </li>
                <li className={cls.listItem}>
                    партнер СибНИА, Красмаш, ИСС им. Решетнева
                </li>
                <li className={cls.listItem}>
                    активно развиваются беспилотные технологии
                </li>
            </ul>
            <h2 className={cls.heading}>
                Уфимский университет науки и технологий
            </h2>
            <p className={cls.regularText}>
                Уфа | Основан в 1932 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    один из главных вузов России по подготовке конструкторов и технологов двигателей
                </li>
                <li className={cls.listItem}>
                    базовый вуз для УМПО и ОДК
                </li>
                <li className={cls.listItem}>
                    сильная школа вычислительной механики, композитов и прочностных расчетов
                </li>
            </ul>
            <h2 className={cls.heading}>
                Иркутский национальный исследовательский технический университет (ИрНИТУ)
            </h2>
            <p className={cls.regularText}>
                Иркутск | Основан в 1930 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    базовый вуз для Иркутского авиационного завода (ИАЗ) — производителя самолетов
                    Су-30СМ, Як-130 и МС-21
                </li>
                <li className={cls.listItem}>
                    готовит инженеров-конструкторов, технологов, специалистов по автоматизации и
                    цифровому производству
                </li>
                <li className={cls.listItem}>
                    сильная база авиастроения, материаловедения и мехатроники
                </li>
                <li className={cls.listItem}>
                    расположен центр цифрового инжиниринга
                </li>
                <li className={cls.listItem}>
                    сотрудничество с корпорацией «Иркут» и ОАК
                </li>
            </ul>
            <h2 className={cls.heading}>
                Комсомольский-на-Амуре государственный университет (КНАГУ)
            </h2>
            <p className={cls.regularText}>
                Комсомольск-на-Амуре | Основан в 1955 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    расположение рядом с КнААЗ — заводом, где производят истребители Су-35, Су-57
                    и Checkmate
                </li>
                <li className={cls.listItem}>
                    готовит кадровую основу Дальневосточного авиастроения
                </li>
                <li className={cls.listItem}>
                    развивает направления: конструирование ЛА, сварка, мехобработка, цифровые
                    технологии в производстве
                </li>
                <li className={cls.listItem}>
                    современные лаборатории и технопарк совместно с ПАО «Сухой»
                </li>
            </ul>
            <h2 className={cls.heading}>
                Новосибирский государственный технический университет (НГТУ-НЭТИ)
            </h2>
            <p className={cls.regularText}>
                Новосибирск | Основан в 1950 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    один из крупнейших вузов Сибири с мощным техническим профилем
                </li>
                <li className={cls.listItem}>
                    сотрудничает с СибНИА, ОДК, предприятиями Ростеха
                </li>
                <li className={cls.listItem}>
                    подготавливает инженеров для аэродинамики, приборостроения, радиосистем и
                    автоматизации
                </li>
                <li className={cls.listItem}>
                    работает над проектами в сфере беспилотников, легкой авиации и композитов
                </li>
            </ul>
            <h2 className={cls.heading}>
                НИУ МГТУ им. Баумана (Московский государственный технический университет им.
                Н.Э. Баумана)
            </h2>
            <p className={cls.regularText}>
                Москва | Основан в 1830 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    один из старейших и престижных технических университетов России
                </li>
                <li className={cls.listItem}>
                    авиационно-космический факультет, готовящий специалистов по двигателям,
                    системам управления, аэрогазодинамике
                </li>
                <li className={cls.listItem}>
                    выпускники работают в ЦАГИ, НПО Лавочкина, КБ «Химмаш», ОАК и ОДК
                </li>
                <li className={cls.listItem}>
                    развивает цифровые технологии, материалы, мехатронику, ИИ в авиации
                </li>
                <li className={cls.listItem}>
                    участвует в проектах Минпромторга и Роскосмоса
                </li>
            </ul>
            <h2 className={cls.heading}>
                МГТУ ГА (Московский государственный технический университет гражданской
                авиации)
            </h2>
            <p className={cls.regularText}>
                Москва | Основан в 1971 году
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    ведущий вуз по подготовке кадров для гражданской авиации: инженерно-
                    технический персонал, летчики, диспетчеры, специалисты по обслуживанию
                    аэропортов
                </li>
                <li className={cls.listItem}>
                    сотрудничает с авиакомпаниями, Росавиацией, МАУ, МАШ, ГСС
                </li>
                <li className={cls.listItem}>
                    оснащен учебно-тренажерными комплексами и авиасимуляторами
                </li>
                <li className={cls.listItem}>
                    развивает направления: авионика, логистика, управление воздушным движением,
                    обслуживание ЛА
                </li>
            </ul>
        </div>
    );
};