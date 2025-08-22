import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { activateButton } from '../store/buttonStore';
import ImageButton from '../ui/ImageBtn'
import backBtn from '../assets/Btn/backBtn.png';
import { Link } from 'react-router-dom';
import AccordionGroup from '../components/AccordionGroup.jsx'
import DiabondBtn from './DiabondBtn.jsx';

const Airplane = () => {
  const dispatch = useDispatch();
  const { activeButton, buttonStates } = useSelector((state) => state.buttons);

  console.log('Airplane render:', { activeButton, buttonStates });

  const handleButtonClick = (buttonId) => {
    console.log('Button clicked:', buttonId);
    dispatch(activateButton(buttonId));
  };

  return (
    <div className="relative">
    <div className="bg-[url(/airplane-route.png)] h-screen w-screen bg-center bg-cover">
    
  <div className=' absolute flex justify-start aling-start left-[460px] top-[450px] scale-[1.13]'>
      <AccordionGroup
        items={[
          {
            number:'01',
            name: 'Экспозиционный стенд',
            description: ' Экспозицонные  витрины с  артефактами  и деталями  самолёта .....',
          },
          {
            number: '02',
            name: 'Мультимедийная стена',
            description: 'Исторические фотографии пассажиров  и экипажа ТУ-144, а также настенная  инфографика с фактами о самолёте',
          },
          {
            number: '03',
            name: 'Интерактивный стенд «Случайные факты»',
            description: ' На внешние стороны витрин нанесены  цифровые значения без объяснения. Посетители, открывая ящик, узнают, что  обозначает данное число в истории ТУ-144  (описание факта или мелкая предметика)',
          },
          {
            number: '04',
            name: 'АК «Воспоминания пилота ТУ-144',
            description: 'С помощью моно-наушников посетители  послушают воспоминания пилота ТУ-144  Кузнецова Б.Ф',
          },
          {
            number: '05',
            name: 'Мультимедийный комплекс «Таймлайн»',
            description: 'С помощью передвижного вогнутого экрана  посетители ознакомятся с историей развития  и создания советского сверхзвукового  пассажирского самолета',
          },
          {
            number: '06',
            name: 'Мультимедийный комплекс «X-ray»',
            description: 'С помощью передвижного вогнутого экрана  создается эффект рентгена, посетители  смогут наблюдать за жизнью на борту  ТУ-144',
          },
          {
            number: '07',
            name: 'Мультимедийная инсталяция',
            description: 'В данной зоне посетители увидят яркое технологичное  проекционное шоу.  В художественном видеоролике различные 3D-эффекты вызовут массу  положительных эмоций и смогут перенести зрителей в разные пространства:  внутрь строящегося самолета, в полет, в открытое небо над городом Казань и др',
          },
          {
            number: '08',
            name: 'Интерактивный макет самолета ТУ-144',
            description: 'Репродукция бизнес класса. Встроенные  в столы тач-экраны с дополнительной  интересной информацией, а также экраны иллюминаторы, создающие эффект полета',
          },
          {
            number: '09',
            name: 'Интерактивная экспозиция «Ретрозал',
            description: ' Репродукция бизнес класса. Встроенные  в столы тач-экраны с дополнительной  интересной информацией, а также экраны иллюминаторы, создающие эффект полета',
          },
          {
            number: '10',
            name: 'Интерактивный комплекс «ТУ-144 в массовой культуре»',
            description: 'Предметы в капсулах, связанные с самолетом,  взяв которые срабатывает датчик и на экране  отображается историческая справка',
          },
          {
            number: '11',
            name: 'Экспозиция «Кухонный блок»',
            description: 'Репродукция бизнес класса. Встроенные  в столы тач-экраны с дополнительной  интересной информацией, а также экраны иллюминаторы, создающие эффект полета',
          },
          {
            number: '12',
            name: 'Симулятор полета',
            description: ' Симулятор полёта на Ту-144 предоставляет  возможность почувствовать себя настоящим  пилотом и совершить полет над городом Казань',
          },
        ]}
        onButtonClick={handleButtonClick}
      />

  </div>  



  {/* Кнопка 01 - Экспозиционный стенд */}
  <div className="diabond-btn-container" style={{ top: '60%', left: '18%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="01"
      pushed={buttonStates['01'] || false}
      onClick={() => handleButtonClick('01')}
    />
  </div>

  {/* Кнопка 02 - Мультимедийная стена */}
  <div className="diabond-btn-container" style={{ top: '58.8%', left: '24.5%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="02"
      pushed={buttonStates['02'] || false}
      onClick={() => handleButtonClick('02')}
    />
  </div>

  {/* Кнопка 03 - Интерактивный стенд */}
  <div className="diabond-btn-container" style={{ top: '53%', left: '18%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="03"
      pushed={buttonStates['03'] || false}
      onClick={() => handleButtonClick('03')}
    />
  </div>

  {/* Кнопка 04 - Воспоминания пилота */}
  <div className="diabond-btn-container" style={{ top: '53%', left: '25%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="04"
      pushed={buttonStates['04'] || false}
      onClick={() => handleButtonClick('04')}
    />
  </div>

  {/* Кнопка 05 - Таймлайн */}
  <div className="diabond-btn-container" style={{ top: '47.5%', left: '17%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="05"
      pushed={buttonStates['05'] || false}
      onClick={() => handleButtonClick('05')}
    />
  </div>

  {/* Кнопка 06 - X-ray */}
  <div className="diabond-btn-container" style={{ top: '47.5%', left: '26%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="06"
      pushed={buttonStates['06'] || false}
      onClick={() => handleButtonClick('06')}
    />
  </div>

  {/* Кнопка 07 - Мультимедийная инсталяция */}
  <div className="diabond-btn-container" style={{ top: '39%', left: '22%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="07"
      pushed={buttonStates['07'] || false}
      onClick={() => handleButtonClick('07')}
    />
  </div>

  {/* Кнопка 08 - Интерактивный макет */}
  <div className="diabond-btn-container" style={{ top: '31%', left: '18%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="08"
      pushed={buttonStates['08'] || false}
      onClick={() => handleButtonClick('08')}
    />
  </div>

  {/* Кнопка 09 - Ретрозал */}
  <div className="diabond-btn-container" style={{ top: '26.7%', left: '19.3%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="09"
      pushed={buttonStates['09'] || false}
      onClick={() => handleButtonClick('09')}
    />
  </div>

  {/* Кнопка 10 - ТУ-144 в массовой культуре */}
  <div className="diabond-btn-container" style={{ top: '26.7%', left: '25.7%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="10"
      pushed={buttonStates['10'] || false}
      onClick={() => handleButtonClick('10')}
    />
  </div>

  {/* Кнопка 11 - Кухонный блок */}
  <div className="diabond-btn-container" style={{ top: '21.3%', left: '21.8%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="11"
      pushed={buttonStates['11'] || false}
      onClick={() => handleButtonClick('11')}
    />
  </div>

  {/* Кнопка 12 - Симулятор полета */}
  <div className="diabond-btn-container" style={{ top: '14%', left: '21.6%', transform: 'scale(1.5)' }}>
    <DiabondBtn 
      number="12"
      pushed={buttonStates['12'] || false}
      onClick={() => handleButtonClick('12')}
    />
  </div>


    </div>
    
    
    <Link to="/">
      <ImageButton
        className='absolute top-[91%] left-[44%] p-0'
        type="temporary"
        defaultImg={backBtn}
        activeImg={backBtn}
        />
    </Link>
    </div>

  )
}

export default Airplane