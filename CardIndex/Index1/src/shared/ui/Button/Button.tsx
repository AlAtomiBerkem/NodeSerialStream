import cls from './Button.module.css'
import { classNames } from "../../lib/classNames.ts";

interface ButtonProps {
    className?: string;
    label?: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        label,
        isActive,
        onClick,
    } = props;

return (
    <div className={classNames(cls.Button, {}, [className])}>

    </div>
    );
};

// export const SelectContentBtn = ({ label, isActive, onClick }) => {
//   return (
//     <button onClick={onClick}>
//       <div>
//         <img
//           src={isActive ? SelectBtn : UnSelectBtn}
//           alt={isActive ? 'selected' : 'unselected'}
//         />
//         <span>
//           {label}
//         </span>
//       </div>
//     </button>
//   );
// };
