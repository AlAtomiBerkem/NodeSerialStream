import {PhotoFrame} from 'widgets/PhotoFrame'
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import { useState } from 'react';

export const PhotoScroller = () => {

    const images = [img1, img2, img3, img4];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleRadioChange = (idx: number) => {
        setCurrentIndex(idx);
    };

    return (
        <div>
            <PhotoFrame
                images={images}
                currentIndex={currentIndex}
                onChange={handleRadioChange}
            />
        </div>
    );
};
