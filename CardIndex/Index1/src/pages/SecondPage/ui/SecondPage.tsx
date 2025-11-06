import { TextInformation2 } from 'src/features/TextInformatiion2';
import cls from './SecondPage.module.css'
import { classNames } from "shared/lib/classNames";
import { PhotoScroller } from 'features/PhotoScroller';
import SecondPageLabel from 'shared/assets/icons/SecondPageLabel.svg?url'
import { BackAndNamePage } from "widgets/BackAndNamePage";
import img1 from 'shared/assets/photos/img1.png';
import img2 from 'shared/assets/photos/img2.png';
import img3 from 'shared/assets/photos/img3.png';
import img4 from 'shared/assets/photos/img4.png';

interface SecondPageProps {
    className?: string;
}

export const SecondPage = ({className}: SecondPageProps) => {

    const photos = [img1, img2, img3, img4];

return (
    <div className={classNames(cls.SecondPage, {}, [className])}>
            <div className={cls.backButtonOverlay}>
                <BackAndNamePage NamePageLabel={SecondPageLabel}/>
            </div>
            <div className={cls.photoSection}>
                <PhotoScroller photos={photos}/>
            </div>
            <div className={cls.textSection}>
                <TextInformation2/>
            </div>
    </div>
    );
};