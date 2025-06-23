import React from 'react';
import RadionBtn from '../../assets/buttons/radionBtn.png';
import RadionBtnActive from '../../assets/buttons/radioBtnActive.png';
import RadionButton from '../../../hooks/RadionBtn.jsx'

import { useState } from 'react'

const RadionButtons = () => {
        const [isButtonPushed, setIsButtonPushed] = useState(false);

  return <div>
            <RadionButton
                top="70%"
                left="50%"
                activeImg={RadionBtn}
                inactiveImg={RadionBtnActive}
                // onClick={() => handleAnswer(true)}
                isActive={isButtonPushed}
                alt="True option"
            />
  </div>;
};

export default RadionButtons;
