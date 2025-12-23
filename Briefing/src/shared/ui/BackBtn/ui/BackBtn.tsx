import {Icon} from 'shared/ui/Icon'
import BackBtnSvg from 'shared/assets/BackBtn.svg?react'

export const BackButton = () => {
    return (
        <Icon
            Svg={BackBtnSvg}
            onClick={() => console.log('click')}
        />
    )
}
