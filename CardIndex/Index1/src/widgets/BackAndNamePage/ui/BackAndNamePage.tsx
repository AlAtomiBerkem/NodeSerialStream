import cls from './BackAndNamePage.module.css'
import { classNames } from "shared/lib/classNames";
import { ClickButton } from 'shared/ui'
import BtnActive from 'shared/assets/btn/BackBtnPushed.svg?url'
import BtnUiActive from 'shared/assets/btn/BackBtnPushed.svg?url'
import FirsPageName from 'shared/assets/icons/FirstPageName.svg?url'

interface BackAndNamePageProps {
    className?: string;
}

export const BackAndNamePage = ({className}: BackAndNamePageProps) => {

return (
    <div className={classNames(cls.BackAndNamePage, {}, [className])}>
        <ClickButton link={'/'} clickedImage={BtnUiActive} normalImage={BtnActive}/>
        <img src={FirsPageName} alt="firsPageName"/>
    </div>
    );
};