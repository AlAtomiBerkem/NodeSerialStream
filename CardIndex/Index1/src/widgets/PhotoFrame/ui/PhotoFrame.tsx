import cls from './PhotoFrame.module.css'
import { classNames } from "shared/lib/classNames";
import photoFrame from "shared/assets/icons/PhotoFrame.svg?url";
import {RadioBtnGroup} from "widgets/RadioBtnGroup";
import { ScrollAnimation } from 'shared/ui';

interface PhotoFrameProps {
    className?: string;
    images: string[];
    currentIndex: number;
    onChange: (idx: number) => void;
}

export const PhotoFrame = ({className, images, currentIndex, onChange}: PhotoFrameProps) => {
    if (!images || typeof currentIndex !== 'number' || !onChange) {
        return null;
    }
    return (
        <div className={cls.RadioBtnScaler}>
            <div className={classNames(cls.PhotoFrame, {}, [className])}>
                <img src={photoFrame} alt="photo-frame"/>
                {images[currentIndex] && (
                    <ScrollAnimation
                        photoUrl={images[currentIndex]}
                        alt={`Фото ${currentIndex + 1}`}
                        className={cls.PhotoInsideFrame}
                        uniqueKey={String(currentIndex)}
                        duration={0.5}
                    />
                )}
                <div className={cls.RadioBtnBottom}>
                    <RadioBtnGroup 
                        count={images.length} 
                        activeIndex={currentIndex} 
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};