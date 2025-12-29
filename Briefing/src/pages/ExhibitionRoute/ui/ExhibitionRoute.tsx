import { useSelector, useDispatch } from 'react-redux';
import { activateButton } from 'app/provider/store/btnSlice';
import { Link } from 'react-router-dom';
import { AccordionGroup } from 'widgets/AcardionGroup';
import { DiamondBtn } from 'shared/ui/DiabondBtn';
import { BackButton } from "shared/ui/BackBtn";
import { classNames } from 'shared/lib';
import { BackgroundScreen } from "widgets/BackgroundScreen";
import cls from './ExhibitionRoute.module.scss';

// Import Assets
import FuselageImage from 'shared/assets/fesulashe.svg';
import MapRoadTitle from 'shared/assets/mapRoad.svg';

export const ExhibitionRoute = () => {
  const dispatch = useDispatch();
  const { activeButton, buttonStates } = useSelector((state: any) => state.buttons);

  console.log('Airplane render:', { activeButton, buttonStates });

  const handleButtonClick = (buttonId: string) => {
    console.log('Button clicked:', buttonId);
    dispatch(activateButton(buttonId));
  };

  const buttons = [
    { id: '01', top: '60%', left: '18%' },
    { id: '02', top: '58.8%', left: '24.5%' },
    { id: '03', top: '53%', left: '18%' },
    { id: '04', top: '53%', left: '25%' },
    { id: '05', top: '47.5%', left: '17%' },
    { id: '06', top: '47.5%', left: '26%' },
    { id: '07', top: '39%', left: '22%' },
    { id: '08', top: '31%', left: '18%' },
    { id: '09', top: '26.7%', left: '19.3%' },
    { id: '10', top: '26.7%', left: '25.7%' },
    { id: '11', top: '21.3%', left: '21.8%' },
    { id: '12', top: '14%', left: '21.6%' },
  ];

  return (
    <BackgroundScreen className={cls.ExhibitionRoute}>
      <img src={MapRoadTitle} className={cls.headerTitle} alt="Маршрут экспозиции" />
      <p className={cls.subtitle}>
        Нажав на метку на карте вы можете узнать, <br />
        что находится в этой части шлюза
      </p>

      <div className={cls.mapSection}>
        <img src={FuselageImage} className={cls.fuselageImage} alt="Fuselage Map" />

        {buttons.map((btn) => (
          <div
            key={btn.id}
            className={cls.btnContainer}
            style={{ top: btn.top, left: btn.left }}
          >
            <DiamondBtn
              number={btn.id}
              pushed={buttonStates[btn.id] || false}
              onClick={() => handleButtonClick(btn.id)}
            />
          </div>
        ))}
      </div>

      <div className={cls.accordionSection}>
        <AccordionGroup
          items={[
            {
              number: '01',
              name: 'Экспозиционный стенд',
              description: 'Экспозицонные витрины с артефактами и деталями самолёта .....',
            },
            {
              number: '02',
              name: 'Мультимедийная стена',
              description: 'Исторические фотографии пассажиров и экипажа ТУ-144, а также настенная инфографика с фактами о самолёте',
            },
            {
              number: '03',
              name: 'Интерактивный стенд «Случайные факты»',
              description: 'На внешние стороны витрин нанесены цифровые значения без объяснения. Посетители, открывая ящик, узнают, что обозначает данное число в истории ТУ-144 (описание факта или мелкая предметика)',
            },
            {
              number: '04',
              name: 'АК «Воспоминания пилота ТУ-144',
              description: 'С помощью моно-наушников посетители послушают воспоминания пилота ТУ-144 Кузнецова Б.Ф',
            },
            {
              number: '05',
              name: 'Мультимедийный комплекс «Таймлайн»',
              description: 'С помощью передвижного вогнутого экрана посетители ознакомятся с историей развития и создания советского сверхзвукового пассажирского самолета',
            },
            {
              number: '06',
              name: 'Мультимедийный комплекс «X-ray»',
              description: 'С помощью передвижного вогнутого экрана создается эффект рентгена, посетители смогут наблюдать за жизнью на борту ТУ-144',
            },
            {
              number: '07',
              name: 'Мультимедийная инсталяция',
              description: 'В данной зоне посетители увидят яркое технологичное проекционное шоу. В художественном видеоролике различные 3D-эффекты вызовут массу положительных эмоций и смогут перенести зрителей в разные пространства: внутрь строящегося самолета, в полет, в открытое небо над городом Казань и др',
            },
            {
              number: '08',
              name: 'Интерактивный макет самолета ТУ-144',
              description: 'Репродукция бизнес класса. Встроенные в столы тач-экраны с дополнительной интересной информацией, а также экраны иллюминаторы, создающие эффект полета',
            },
            {
              number: '09',
              name: 'Интерактивная экспозиция «Ретрозал',
              description: 'Репродукция бизнес класса. Встроенные в столы тач-экраны с дополнительной интересной информацией, а также экраны иллюминаторы, создающие эффект полета',
            },
            {
              number: '10',
              name: 'Интерактивный комплекс «ТУ-144 в массовой культуре»',
              description: 'Предметы в капсулах, связанные с самолетом, взяв которые срабатывает датчик и на экране отображается историческая справка',
            },
            {
              number: '11',
              name: 'Экспозиция «Кухонный блок»',
              description: 'Репродукция бизнес класса. Встроенные в столы тач-экраны с дополнительной интересной информацией, а также экраны иллюминаторы, создающие эффект полета',
            },
            {
              number: '12',
              name: 'Симулятор полета',
              description: 'Симулятор полёта на Ту-144 предоставляет возможность почувствовать себя настоящим пилотом и совершить полет над городом Казань',
            },
          ]}
          onButtonClick={handleButtonClick}
        />
      </div>

      <Link to="/" className={cls.backBtn}>
        <BackButton />
      </Link>
    </BackgroundScreen>
  );
};