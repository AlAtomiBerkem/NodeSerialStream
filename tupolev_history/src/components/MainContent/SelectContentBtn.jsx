import React from 'react';

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
      }}
      onClick={onClick}
    >
      <svg
        width="592"
        height="75"
        viewBox="0 0 592 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 74L74.9168 1H517L590 74H2Z"
          fill={isActive ? '#72D8FF' : '#191919'}
        />
        <path
          d="M2 74L74.9168 1H517L590 74H2Z"
          stroke={isActive ? '#72D8FF' : '#A1A1A1'}
          strokeWidth="1.5"
          fill="none"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={isActive ? '#000000' : '#A1A1A1'}
          fontSize="26"
          // fontFamily="Arial, sans-serif"
        >
          {label}
        </text>
      </svg>
    </button>
  );
};

export default SelectContentBtn;
