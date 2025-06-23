import React from 'react';
import SelectContentBtn from './SelectContentBtn.jsx';

const ButtonGroup = () => {
  const [activeButton, setActiveButton] = React.useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div style={{ 
      position: 'fixed',
      bottom: '45px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '0',
      alignItems: 'flex-end',
      zIndex: 100,
    }}>
      <div style={{ 
        position: 'relative',
        marginRight: '-90px',
        zIndex: activeButton === 'inventions' ? 3 : 1,
        transition: 'all 0.3s ease',
      }}>
        <SelectContentBtn 
          label="А. Н. ТУПОЛЕВ" 
          isActive={activeButton === 'inventions'} 
          onClick={() => handleButtonClick('inventions')} 
        />
      </div>
      
      <div style={{ 
        position: 'relative',
        marginRight: '-90px',
        zIndex: activeButton === 'patents' ? 3 : 2,
        transition: 'all 0.3s ease',
      }}>
        <SelectContentBtn 
          label="ИЗОБРЕТЕНИЯ" 
          isActive={activeButton === 'patents'} 
          onClick={() => handleButtonClick('patents')} 
        />
      </div>
      
      <div style={{ 
        position: 'relative',
        zIndex: activeButton === 'licenses' ? 3 : 1,
        transition: 'all 0.3s ease',
      }}>
        <SelectContentBtn 
          label="СУ-43" 
          isActive={activeButton === 'licenses'} 
          onClick={() => handleButtonClick('licenses')} 
        />
      </div>
    </div>
  );
};

export default ButtonGroup;