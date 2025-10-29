import type {ButtonHTMLAttributes} from "react";

export enum ButtonSliderTheme {
    DEFAULT = "default",
    ACTIVE = "active",
}

export interface ButtonSliderProps  extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonSliderTheme;
    isActive?: boolean;
    defaultImage: string;
    activeImage: string;
    alt?: string;
    index?: number;
    onButtonClick?: (index: number) => void;
}