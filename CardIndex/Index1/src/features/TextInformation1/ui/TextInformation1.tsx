import cls from 'app/styles/TextInformation.module.css'
import { classNames } from "shared/lib/classNames";

interface TextInformationProps {
    className?: string;
}

export const TextInformation1 = ({className}: TextInformationProps) => {
    return (
        <div className={classNames(cls.TextInformation, {}, [className])}>
            <p className={cls.regularText}>
                Конструкторское бюро — место, где рождается идея самолета и происходит путь от замысла
                до реализации. Это целая система с инженерами, математиками, программистами,
                аэродинамиками и испытателями. В отличие от завода, КБ не производит технику, а создает
                проект, который затем передается в производство.
            </p>
            <h2 className={cls.heading}>
                ЧЕМ ЗАНИМАЕТСЯ КБ
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Проектирует авиационную технику: истребители, бомбардировщики, пассажирские
                    лайнеры, беспилотники
                </li>
                <li className={cls.listItem}>
                    Разрабатывает аэродинамические и конструкционные схемы
                </li>
                <li className={cls.listItem}>
                    Проводит расчёты прочности, устойчивости, управляемости
                </li>
                <li className={cls.listItem}>
                    Создаёт опытные образцы для испытаний
                </li>
                <li className={cls.listItem}>
                    Участвует в доработке серийных машин
                </li>
                <li className={cls.listItem}>
                    Внедряет инновации – от композитных материалов до цифрового проектирования
                </li>
            </ul>
            <h2 className={cls.heading}>
                ИСТОРИЯ КБ В РОССИИ
            </h2>
            <p className={cls.regularText}>
                Первые КБ появились в 1920-х годах и назывались «бригадами» при авиазаводах. К 1940-м
                годам сформировались знаменитые ОКБ: Туполева, Сухого, Яковлева, Ильюшина, Микояна.
                Каждое КБ имело собственный номер, специализацию и собственный завод.
            </p>
            <h2 className={cls.heading}>
                КАК УСТРОЕНО КБ
            </h2>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    Отделы аэродинамики, прочности, систем управления, гидравлики, вооружения
                </li>
                <li className={cls.listItem}>
                    Чертежные бюро и отделы 3D-моделирования
                </li>
                <li className={cls.listItem}>
                    Испытательные отделы, стенды, лаборатории
                </li>
                <li className={cls.listItem}>
                    Часто — собственный аэродром и летные испытатели
                </li>
            </ul>
        </div>
    );
};