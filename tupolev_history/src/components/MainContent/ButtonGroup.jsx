import React from 'react';
import SelectContentBtn from './SelectContentBtn.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setSection } from '../../store/slices/sectionSlice';

const ButtonGroup = () => {
  const dispatch = useDispatch();
  const activeButton = useSelector((state) => state.section.currentSection);
  const handleButtonClick = (buttonName) => {
    dispatch(setSection(buttonName));
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0',
        alignItems: 'flex-end',
        zIndex: 100,
      }}
    >
      <div
        style={{
          position: 'relative',
          marginRight: '-60px',
          zIndex: activeButton === 'inventions' ? 3 : 1,
        }}
      >
        <SelectContentBtn
          label="А. Н. ТУПОЛЕВ"
          isActive={activeButton === 'inventions'}
          onClick={() => handleButtonClick('inventions')}
        />
      </div>

      <div
        style={{
          position: 'relative',
          marginRight: '-60px',
          zIndex: activeButton === 'patents' ? 3 : 2,
        }}
      >
        <SelectContentBtn
          label="ИЗОБРЕТЕНИЯ"
          isActive={activeButton === 'patents'}
          onClick={() => handleButtonClick('patents')}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: activeButton === 'licenses' ? 3 : 1,
        }}
      >
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