import React from 'react';
import UnSelectBtn from '../../assets/UnSelectBtn.png';
import SelectBtn from '../../assets/SelectBtn.png';

const SelectContentBtn = ({ label, isActive, onClick }) => {
  return (
    <button
      style={{
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        padding: 0,
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 592,
        height: 75,
        boxSizing: 'border-box',
        position: 'relative',
      }}
      onClick={onClick}
    >
      <div style={{width: 592, height: 75, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img
          src={isActive ? SelectBtn : UnSelectBtn}
          alt={isActive ? 'selected' : 'unselected'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: isActive ? '#000000' : '#A1A1A1',
            fontSize: 28,
            fontFamily: 'Akrobat, Arial, sans-serif',
            fontWeight: 600,
            textAlign: 'center',
            width: '90%',
            pointerEvents: 'none',
            lineHeight: 1.1,
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
};

export default SelectContentBtn;
