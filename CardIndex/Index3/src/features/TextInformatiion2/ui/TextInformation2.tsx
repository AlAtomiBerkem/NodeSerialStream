import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation2 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
         <h2 className={cls.heading}>
             ЦАГИ — Центральный аэрогидродинамический институт
         </h2>
            <p className={cls.regularText}>
                Главный центр аэродинамики.
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    гигантские аэродинамические трубы
                </li>
                <li className={cls.listItem}>
                    испытания моделей самолетов и ракет
                </li>
                <li className={cls.listItem}>
                    современные методы компьютерного моделирования потоков
                </li>
            </ul>
            <h2 className={cls.heading}>
                ВИАМ — Всероссийский институт авиационных материалов
            </h2>
            <p className={cls.regularText}>
                Разрабатывает сплавы, жаропрочные материалы, композиты.
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    материалы для двигателей, обшивки, силовых элементов
                </li>
                <li className={cls.listItem}>
                    металлы нового поколения, наноструктурные покрытия
                </li>
                <li className={cls.listItem}>
                    высокая износостойкость и легкость изделий
                </li>
            </ul>
            <h2 className={cls.heading}>
                СибНИА — Сибирский НИИ авиации им. С.А. Чаплыгина
            </h2>
            <p className={cls.regularText}>
                Научные испытания и модернизация реальных самолетов
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    испытания на прочность фюзеляжа, крыльев
                </li>
                <li className={cls.listItem}>
                    исследования управляемости, вибрации, усталости конструкций
                </li>
                <li className={cls.listItem}>
                    летно-испытательный центр с собственными бортами
                </li>
            </ul>
            <h2 className={cls.heading}>
                ГосНИИАС — Государственный НИИ авиационных систем
            </h2>
            <p className={cls.regularText}>
                Специализируется на бортовых комплексах управления, авионике и «цифре».
            </p>
            <h2 className={cls.heading}>
                Чем знаменит
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    разработка программного обеспечения и ИИ для управления полетом
                </li>
                <li className={cls.listItem}>
                    автоматизированные системы диагностики и мониторинга
                </li>
                <li className={cls.listItem}>
                    интерфейсы пилот-машина
                </li>
            </ul>
        </div>
    );
};