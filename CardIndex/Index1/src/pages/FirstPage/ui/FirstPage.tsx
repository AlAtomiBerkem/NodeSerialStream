import cls from './FirstPage.module.css'
import { classNames } from "shared/lib/classNames";
import { PhotoScroller } from 'features/PhotoScroller';
import { TextInformation } from 'features/TextInformation';
import { BackAndNamePage } from "widgets/BackAndNamePage";

interface FirstPageProps {
    className?: string;
}

export const FirstPage = ({className}: FirstPageProps) => {
    return (
        <div className={classNames(cls.FirstPage, {}, [className])}>
            <div className={cls.backButtonOverlay}>
                <BackAndNamePage/>
            </div>
            <div className={cls.photoSection}>
                <PhotoScroller/>
            </div>
            <div className={cls.textSection}>
                <TextInformation/>
            </div>
        </div>
    );
};