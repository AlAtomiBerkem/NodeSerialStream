import cls from './PhotoFrame.module.css'
import { classNames } from "shared/lib/classNames";
import photoFrame from "shared/assets/icons/PhotoFrame.svg?url"
import {RadioBtnGroup} from "widgets/RadioBtnGroup";

interface PhotoFrameProps {
    className?: string;
}

export const PhotoFrame = ({className}: PhotoFrameProps) => {

return (
    <div className={cls.RadioBtnScaler}>
        <div className={classNames(cls.PhotoFrame, {}, [className])}>
            <img src={photoFrame} alt="photo-frame"/>
            <div className={cls.RadioBtnBottom}>
                <RadioBtnGroup />
            </div>
        </div>
    </div>
    );
};