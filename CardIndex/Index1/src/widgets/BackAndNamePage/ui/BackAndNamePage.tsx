import cls from './BackAndNamePage.module.css'
import { classNames } from "shared/lib/classNames";
import { ClickButton } from 'shared/ui'
import BackBtn from 'shared/assets/btn/BackBtn.svg?url'
import BackBtnPushed from 'shared/assets/btn/BackBtnPushed.svg?url'

interface BackAndNamePageProps {
    className?: string;
    NamePageLabel: string;
}

export const BackAndNamePage = (props: BackAndNamePageProps) => {
    const {
        className,
        NamePageLabel,
    } = props;
return (
    <div className={classNames(cls.BackAndNamePage, {}, [className])}>
        <div className={cls.backbtn}>
            <ClickButton
                link={'/' }
                clickedImage={BackBtnPushed}
                normalImage={BackBtn}
            />
        </div>
        <img src={NamePageLabel} alt="firsPageName"/>
    </div>
    );
};