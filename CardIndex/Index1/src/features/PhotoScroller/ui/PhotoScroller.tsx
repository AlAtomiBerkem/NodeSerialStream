import {PhotoFrame} from 'widgets/PhotoFrame'
import { useState } from 'react';

interface PhotoScrollerProps {
    photos?: string[];
}

export const PhotoScroller = (props: PhotoScrollerProps) => {
    const { photos } = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleRadioChange = (idx: number) => {
        setCurrentIndex(idx);
    };

    if (!photos || photos.length === 0) {
        return null;
    }

    return (
        <div>
            <PhotoFrame
                images={photos}
                currentIndex={currentIndex}
                onChange={handleRadioChange}
            />
        </div>
    );
};
