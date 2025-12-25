import cls from './Instructions.module.scss'
import { classNames } from "shared/lib";
import { Accordion } from "shared/ui/Accordion";
import { BackButton } from "shared/ui/BackBtn";
import { useNavigate } from "react-router-dom";
import { routePath, RouteConfig } from "shared/config/routeConfig";
import InstructionSvg from "shared/assets/instruction.svg?react";

interface InstructionsProps {
    className?: string;
}

export const Instructions = ({className}: InstructionsProps) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(routePath[RouteConfig.MAIN]);
    };

    const accordionItems = [
        {
            id: 1,
            number: '01',
            title: 'КАК ПОДНЯТЬСЯ НА БОРТ',
            content: 'Посетить фюзеляж можно в составе организованных групп до 8 человек. Время полета - 90 минут. Вход без сопровождения экскурсовода запрещен!',
        },
        {
            id: 2,
            number: '02',
            title: 'ЕСЛИ ТЫ НЕ УСПЕЛ ПРИСОЕДИНИТЬСЯ К ЭКИПАЖУ',
            items: [
                'Дождись формирования новой группы',
                'Воспользуйся VR-очками для виртуальной экскурсии в фюзеляж самолета. VR-зона находится справа от стенда с инструкциями',
            ],
            smallTexts: [
                'Пока ты ждешь экскурсии или наблюдаешь за VR-зоной - это отличный момент для фото на память. Сделай ты красивое селфи на фоне или возьми забавный реквизит, чтобы сделать уникальные фото.',
                '- В зоне «Кабина пилота» могут находиться не более двух посетителей. Во время ожидания своей очереди ты можешь посидеть в VR-зоне или прогуляться по Exhibition.',
                '- Купи что-нибудь в сувенирной лавке или выпей что-нибудь.',
            ],
        },
        {
            id: 3,
            number: '03',
            title: 'ПРАВИЛА ПОВЕДЕНИЯ НА БОРТУ',
            items: [
                'Не бегай, береги себя и самолет',
                'Фото и видеосъемка разрешены: воспоминания можно хранить не только в памяти, но и в пикселях',
                'Не трогай технику и оборудование без разрешения экскурсовода',
                'Соблюдай тишину во время экскурсии',
                'Не покидай группу без предупреждения',
                'Следуй указаниям экскурсовода',
                'Бережно относись к экспонатам и интерьеру самолета',
            ],
        },
        {
            id: 4,
            number: '04',
            title: 'ОГРАНИЧЕНИЯ',
            items: [
                'Маленькие пилоты до 10 лет - только в присутствии родителей',
                'Без животных: увы, четвероногие друзья плохо переносят высоту',
                'Лицам с ограниченными физическими возможностями рекомендуется сопровождение',
                'Беременным женщинам посещение не рекомендуется',
            ],
        },
        {
            id: 5,
            icon: 'info' as const,
            title: 'ВНИМАНИЕ',
            content: 'Экскурсовод может попросить тебя покинуть музей, если:',
            items: [
                'Ты находишься в состоянии алкогольного опьянения',
                'Ты игнорируешь замечания и просьбы экскурсовода',
                'Твое поведение создает опасность для других посетителей',
                'Ты нарушаешь правила безопасности',
            ],
        },
    ];

    return (
        <div className={classNames(cls.Instructions, {}, [className])}>
            <div className={cls.container}>
                <div className={cls.header}>
                    <div className={cls.titleFrame}>
                        <InstructionSvg className={cls.titleIcon} />
                    </div>
                    <p className={cls.greeting}>
                        Приветствуем! Прежде чем подняться на борт ТУ-144, ознакомься с правилами.
                    </p>
                </div>

                <div className={cls.content}>
                    <Accordion items={accordionItems} />
                </div>

                <div className={cls.footer}>
                    <p className={cls.footerText}>ЖЕЛАЕМ ХОРОШЕГО ПОЛЕТА!</p>
                    <button className={cls.backButton} onClick={handleBack}>
                        <BackButton />
                    </button>
                </div>
            </div>
        </div>
    );
};