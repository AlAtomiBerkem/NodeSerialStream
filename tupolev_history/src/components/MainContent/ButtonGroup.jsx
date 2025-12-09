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
  const buttons = [
    { key: 'inventions', label: 'БИОГРАФИЯ' },
    { key: 'patents', label: 'НАЧАЛО ПУТИ' },
    { key: 'licenses', label: 'ЗАКЛЮЧЕНИЕ В ЦКБ-29' },
    { key: 'projects', label: 'РАЗРАБОТКИ И Д-ИЯ' },
    { key: 'awards', label: 'НАСЛЕДИЕ' },
  ];

  const activeIndex = buttons.findIndex((btn) => btn.key === activeButton);

  const getZIndex = (idx) => {
    if (activeIndex === -1) {
      return 10 + idx;
    }
    const distance = Math.abs(idx - activeIndex);
    return 100 - distance;
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%) scale(0.9)',
        transformOrigin: 'center bottom',
        display: 'flex',
        gap: '0',
        alignItems: 'flex-end',
        zIndex: 100,
      }}
    >
      {buttons.map((button, idx) => (
        <div
          key={button.key}
          style={{
            position: 'relative',
            marginRight: idx < buttons.length - 1 ? '-80px' : 0,
            zIndex: getZIndex(idx),
          }}
        >
          <SelectContentBtn
            label={button.label}
            isActive={activeButton === button.key}
            onClick={() => handleButtonClick(button.key)}
          />
        </div>
      ))}
    </div>
  );
};

export default ButtonGroup;