// useButton.jsx
import { useState } from 'react';

const useButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const Button = ({ defaultIcon: DefaultIcon, pressedIcon: PressedIcon }) => (
    <button 
      onClick={() => setIsPressed(!isPressed)}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {isPressed ? <PressedIcon /> : <DefaultIcon />}
    </button>
  );

  return { Button };
};

export default useButton;