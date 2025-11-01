import { TextInformation } from 'features/TextInformation';
import cls from './LastPage.module.css'
import { classNames } from "shared/lib/classNames";
import { BackAndNamePage } from 'widgets/BackAndNamePage';
import { PhotoScroller } from 'features/PhotoScroller';
import LastLabelName from 'shared/assets/icons/LastLabelName.svg?url'

interface LastPageProps {
    className?: string;
}

export const LastPage = ({className}: LastPageProps) => {

return (
    <div className={classNames(cls.LastPage, {}, [className])}>
            <div className={cls.backButtonOverlay}>
                <BackAndNamePage NamePageLabel={LastLabelName}/>
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