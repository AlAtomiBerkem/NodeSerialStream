import { ClickButton } from 'shared/ui/index.ts'
import LinkBtn from 'shared/assets/btn/LinkBtn.svg?url'
import LinkBtnClicked from 'shared/assets/btn/LinkBtnClick.svg?url'
import BtnBody from 'shared/assets/btn/BtnBody.svg?url'
import cls from './LinkBtn.module.css'

export interface LinkBtnProps {
    nameBtn: string
}

export const LinkButton = (props: LinkBtnProps) => {
    const { nameBtn } = props;

    return (
        <div className={cls.container}>
            <div className={cls.shadowWrapper}>
                <div className={cls.backgroundWrapper}>
                    <img src={BtnBody} alt="btnBody" className={cls.backgroundImage}/>
                    <span className={cls.nameButton}>{nameBtn}</span>
                    <div className={cls.buttonWrapper}>
                        <ClickButton
                            clickedImage={LinkBtnClicked}
                            normalImage={LinkBtn}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};