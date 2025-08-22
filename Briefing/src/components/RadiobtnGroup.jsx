import ImageButton from '../ui/ImageBtn'
import defoult from '../assets/Btn/radio.png';
import select from '../assets/Btn/radioSelect.png'

const RadionbtnGroup = ({ className = '' }) => {

    return (
        <div className={"flex flex-row justify-center items-center gap-1 " + className}>

            <ImageButton
                        type="toggle"
                        defaultImg={defoult}
                        activeImg={select}
                        />

            <ImageButton
                        type="toggle"
                        defaultImg={defoult}
                        activeImg={select}
                        />

            <ImageButton
                        type="toggle"
                        defaultImg={defoult}
                        activeImg={select}
                        />

            <ImageButton
                        type="toggle"
                        defaultImg={defoult}
                        activeImg={select}
                        />
                    </div>
    )
}

export default RadionbtnGroup;