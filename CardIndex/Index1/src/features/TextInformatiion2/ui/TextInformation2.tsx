import cls from './TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation2 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <h2 className={cls.heading}>
                Конструкторские бюро, определившие облик российской авиации
            </h2>
            <p className={cls.regularText}>
                В советское время каждое КБ имело четкую специализацию: одни разрабатывали
                стратегические бомбардировщики, другие — истребители или вертолеты. КБ СССР и
                России создали сотни моделей самолетов и вертолетов, многие из которых стали знаковыми
                для мировой авиации.
                Сегодня наработки продолжают развиваться в современных проектах и остаются основой
                боевой и гражданской авиации России.
            </p>
            <h2 className={cls.heading}>
                ОКБ Туполева (ныне — ПАО «Туполев»)
            </h2>
            <p className={cls.regularText}>
                Основано: 1922 г.
                Специализация: тяжелая авиация, пассажирские лайнеры, бомбардировщики
            </p>
            <h2 className={cls.heading}>
                ЗНАКОВЫЕ РАЗРАБОТКИ
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    АНТ-20 «Максим Горький» — крупнейший самолет своего времени
                </li>
                <li className={cls.listItem}>
                    Ту-2 — один из главных бомбардировщиков Второй мировой
                </li>
                <li className={cls.listItem}>
                    Ту-95 — стратегический турбовинтовой бомбардировщик с дальностью до 10 000 км
                </li>
                <li className={cls.listItem}>
                    Ту-104 — первый в мире серийный реактивный пассажирский самолет
                </li>
                <li className={cls.listItem}>
                    Ту-160 «Белый лебедь» — сверхзвуковой бомбардировщик с изменяемой стреловидностью крыла
                </li>
                <li className={cls.listItem}>
                    Внедряет инновации – от композитных материалов до цифрового проектирования
                </li>
            </ul>
            <p className={cls.regularText}>
                Туполевское КБ стало синонимом «большой авиации» — мощной, скоростной и дальнобойной.
            </p>
            <h2 className={cls.heading}>
                ОКБ Сухого (ныне — ПАО «Сухой»)
            </h2>
            <p className={cls.regularText}>
                Основано: 1939 г.
                Специализация: фронтовая и штурмовая авиация, истребители
            </p>
            <h2 className={cls.heading}>
                Знаковые разработки:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Су-7, Су-17 — реактивные штурмовики
                </li>
                <li className={cls.listItem}>
                    Су-24 — первый в СССР всепогодный бомбардировщик с изменяемой геометрией
                    крыла;
                </li>
                <li className={cls.listItem}>
                    Су-27, Су-30, Су-35 — семейство многоцелевых истребителей, основа ВВС
                </li>
                <li className={cls.listItem}>
                    Су-57 — истребитель пятого поколения
                </li>
                <li className={cls.listItem}>
                    Су-47 «Беркут» — экспериментальный самолет с обратной стреловидностью крыла
                </li>
            </ul>
            <p className={cls.regularText}>
                Су-авиация известна маневренностью, мощью и инновационными аэродинамическими
                решениями.
            </p>
            <h2 className={cls.heading}>
                ОКБ Микояна (МиГ)
            </h2>
            <p className={cls.regularText}>
                Основано: 1939 г.
                Специализация: скоростные истребители-перехватчики и фронтовая авиация
            </p>
            <h2 className={cls.heading}>
                Знаковые разработки:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    МиГ-15 — основной истребитель в Корейской войне
                </li>
                <li className={cls.listItem}>
                    МиГ-21 — самый массовый сверхзвуковой истребитель в истории
                </li>
                <li className={cls.listItem}>
                    МиГ-25 — перехватчик, разгонявшийся до 3 Маха (≈ 3579 км/ч)
                </li>
                <li className={cls.listItem}>
                    МиГ-29 — маневренный истребитель четвертого поколения
                </li>
                <li className={cls.listItem}>
                    МиГ-31 — дальний перехватчик, до сих пор на службе.
                </li>
            </ul>
            <p className={cls.regularText}>
                МиГи — визитная карточка советской авиации за рубежом: экспортировались более чем в 40
                стран.
            </p>
            <h2 className={cls.heading}>
                КБ Миля (сегодня — Национальный центр Миля и Камова)
            </h2>
            <h2 className={cls.heading}>
                Разработки:
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Ми-8 — самый массовый вертолет в истории
                </li>
                <li className={cls.listItem}>
                    Ми-24 — «летающий танк»
                </li>
                <li className={cls.listItem}>
                    Ми-26 — крупнейший серийный транспортный вертолет в мире
                </li>
            </ul>
            <h2 className={cls.heading}>
                КБ Камова
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Ка-25, Ка-27 — морские вертолеты
                </li>
                <li className={cls.listItem}>
                    Ка-50 «Черная акула», Ка-52 «Аллигатор» — ударные вертолеты с соосными винтами.
                </li>
            </ul>
            <p className={cls.regularText}>
                Камов и Миль предложили разные школы вертолетной инженерии: классическая (Миль) и
                соосная (Камов), обе — признанные мировым сообществом.
            </p>

        </div>
    );
};