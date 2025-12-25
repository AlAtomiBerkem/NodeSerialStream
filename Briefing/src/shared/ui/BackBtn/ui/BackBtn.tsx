import BackBtnSvg from 'shared/assets/backbtn.svg?react'
import cls from './BackBtn.module.scss'

export const BackButton = () => {
    return (
        <BackBtnSvg className={cls.backButtonSvg} />
    )
}
