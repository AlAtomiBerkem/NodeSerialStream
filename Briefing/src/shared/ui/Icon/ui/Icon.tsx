import type { FC } from 'react'
import type { ComponentType, SVGProps } from 'react'
import { classNames } from 'shared/lib'
import cls from './Icon.module.scss'

export type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>
export type IconProps = {
  Svg: SvgComponent
  size?: number
  className?: string
  onClick?: () => void
}

export const Icon: FC<IconProps> = (props: IconProps) => {
  const {
    Svg,
    size,
    className,
    onClick,
  } = props
  return (
    <span
      className={classNames(cls.icon, {}, [className])}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Svg />
    </span>
  )
}
