import cls from './PhotoScroller.module.css'
import { classNames } from "shared/lib/classNames";
import {PhotoFrame} from 'widgets/PhotoFrame'
import {ScrollAnimation} from 'shared/ui/index'
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import { useState } from 'react';

interface PhotoScrollerProps {
    className?: string;
}

export const PhotoScroller = (props: PhotoScrollerProps) => {
    const {
        className,
    } = props;

    const images = [img1, img2, img3, img4];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleRadioChange = (idx: number) => {
        setCurrentIndex(idx);
    };

    return (
        <div className={classNames(cls.PhotoScroller, {}, [className])}>
            <PhotoFrame
                images={images}
                currentIndex={currentIndex}
                onChange={handleRadioChange}
            />
        </div>
    );
};
