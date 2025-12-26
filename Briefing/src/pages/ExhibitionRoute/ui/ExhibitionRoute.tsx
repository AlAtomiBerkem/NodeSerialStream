import { useSelector, useDispatch } from 'react-redux';
import { activateButton } from 'app/provider/store/btnSlice';
import { Link } from 'react-router-dom';
import {AccordionGroup} from 'widgets/AcardionGroup'
import { DiamondBtn } from 'shared/ui/DiabondBtn';
import { BackButton } from "shared/ui/BackBtn";
import { classNames } from 'shared/lib';
export const ExhibitionRoute = () => {

      const dispatch = useDispatch();
      const { activeButton, buttonStates } = useSelector((state: any) => state.buttons);
    
      console.log('Airplane render:', { activeButton, buttonStates });
    
      const handleButtonClick = (buttonId: string) => {
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
    
      <div className="diabond-btn-container" style={{ top: '60%', left: '18%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="01"
          pushed={buttonStates['01'] || false}
          onClick={() => handleButtonClick('01')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '58.8%', left: '24.5%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="02"
          pushed={buttonStates['02'] || false}
          onClick={() => handleButtonClick('02')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '53%', left: '18%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="03"
          pushed={buttonStates['03'] || false}
          onClick={() => handleButtonClick('03')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '53%', left: '25%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="04"
          pushed={buttonStates['04'] || false}
          onClick={() => handleButtonClick('04')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '47.5%', left: '17%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="05"
          pushed={buttonStates['05'] || false}
          onClick={() => handleButtonClick('05')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '47.5%', left: '26%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="06"
          pushed={buttonStates['06'] || false}
          onClick={() => handleButtonClick('06')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '39%', left: '22%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="07"
          pushed={buttonStates['07'] || false}
          onClick={() => handleButtonClick('07')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '31%', left: '18%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="08"
          pushed={buttonStates['08'] || false}
          onClick={() => handleButtonClick('08')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '26.7%', left: '19.3%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="09"
          pushed={buttonStates['09'] || false}
          onClick={() => handleButtonClick('09')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '26.7%', left: '25.7%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="10"
          pushed={buttonStates['10'] || false}
          onClick={() => handleButtonClick('10')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '21.3%', left: '21.8%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="11"
          pushed={buttonStates['11'] || false}
          onClick={() => handleButtonClick('11')}
        />
      </div>
    
      <div className="diabond-btn-container" style={{ top: '14%', left: '21.6%', transform: 'scale(1.5)' }}>
        <DiamondBtn 
          number="12"
          pushed={buttonStates['12'] || false}
          onClick={() => handleButtonClick('12')}
        />
      </div>
        </div>
        <Link to="/">
            <BackButton />
        </Link>
        </div>
    
      )
    }