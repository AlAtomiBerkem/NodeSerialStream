import {ClickButton} from 'shared/ui/index.ts'
import BackBtn from 'shared/assets/btn/BackBtn.svg?url'
import BackBtnBushed from 'shared/assets/btn/BackBtnPushed.svg?url'

export const BackButton = () => {

    return (
        <ClickButton  clickedImage={BackBtnBushed} normalImage={BackBtn}/>
    );
};