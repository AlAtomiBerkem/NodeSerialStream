import { TextInformation } from 'features/TextInformation';
import cls from './LastPage.module.css'
import { classNames } from "shared/lib/classNames";
import { BackAndNamePage } from 'widgets/BackAndNamePage';
import { PhotoScroller } from 'features/PhotoScroller';
import LastLabelName from 'shared/assets/icons/LastLabelName.svg?url'
import img1 from 'shared/assets/photos/img1.png';
import img2 from 'shared/assets/photos/img2.png';
import img3 from 'shared/assets/photos/img3.png';
import img4 from 'shared/assets/photos/img4.png';

interface LastPageProps {
    className?: string;
}

export const LastPage = ({className}: LastPageProps) => {
    const photos = [img1, img2, img3, img4];
return (
    <div className={classNames(cls.LastPage, {}, [className])}>
            <div className={cls.backButtonOverlay}>
                <BackAndNamePage NamePageLabel={LastLabelName}/>
            </div>
            <div className={cls.photoSection}>
                <PhotoScroller photos={photos}/>
            </div>
            <div className={cls.textSection}>
                <TextInformation/>
            </div>
        </div>
    );
};