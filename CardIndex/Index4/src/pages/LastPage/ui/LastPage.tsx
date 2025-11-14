import { TextInformation3 } from 'src/features/TextInformation3';
import cls from './LastPage.module.css'
import { classNames } from "shared/lib/classNames";
import { BackAndNamePage } from 'widgets/BackAndNamePage';
import { PhotoScroller } from 'features/PhotoScroller';
import LastPageLabel from 'shared/assets/icons/LastPage.svg?url'
import img1 from 'shared/assets/photos/2_1_3_1.png';
import img2 from 'shared/assets/photos/2_1_3_2.png';
import img3 from 'shared/assets/photos/2_1_3_3.png';
import img4 from 'shared/assets/photos/2_1_3_4.png';

interface LastPageProps {
    className?: string;
}

export const LastPage = ({className}: LastPageProps) => {
    const photos = [img1, img2, img3, img4];
return (
    <div className={classNames(cls.LastPage, {}, [className])}>
            <div className={cls.backButtonOverlay}>
                <BackAndNamePage NamePageLabel={LastPageLabel}/>
            </div>
            <div className={cls.photoSection}>
                <PhotoScroller photos={photos}/>
            </div>
            <div className={cls.textSection}>
                <TextInformation3/>
            </div>
        </div>
    );
};