import { TextInformation } from 'features/TextInformation';
import cls from './SecondPage.module.css'
import { classNames } from "shared/lib/classNames";
import { PhotoScroller } from 'features/PhotoScroller';
import SecondPageName from 'shared/assets/icons/SecondLabelName.svg?url'
import { BackAndNamePage } from "widgets/BackAndNamePage";

interface SecondPageProps {
    className?: string;
}

export const SecondPage = ({className}: SecondPageProps) => {

return (
    <div className={classNames(cls.SecondPage, {}, [className])}>
            <div className={cls.backButtonOverlay}>
                <BackAndNamePage NamePageLabel={SecondPageName}/>
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