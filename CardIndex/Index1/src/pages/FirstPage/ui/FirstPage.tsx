import cls from './FirstPage.module.css'
import { classNames } from "shared/lib/classNames";
import { PhotoScroller } from 'features/PhotoScroller';
import { TextInformation } from 'features/TextInformation';
import { BackAndNamePage } from "widgets/BackAndNamePage";
import FirsPageName from 'shared/assets/icons/FirstPageName.svg?url'
import img1 from 'shared/assets/photos/img1.png';
import img2 from 'shared/assets/photos/img2.png';
import img3 from 'shared/assets/photos/img3.png';
import img4 from 'shared/assets/photos/img4.png';

interface FirstPageProps {
    className?: string;
}

export const FirstPage = ({className}: FirstPageProps) => {
    const photos = [img1, img2, img3, img4];
    return (
        <div className={classNames(cls.FirstPage, {}, [className])}>
            <div className={cls.backButtonOverlay}>
                <BackAndNamePage NamePageLabel={FirsPageName}/>
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