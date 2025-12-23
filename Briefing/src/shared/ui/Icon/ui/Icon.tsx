import { FC } from 'react'
import clsx from 'clsx'
import type { ComponentType, SVGProps } from 'react'

export type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>

export interface IconProps {
  Svg: SvgComponent
  size?: number
  className?: string
  onClick?: () => void
}

export const Icon: FC<IconProps> = ({
  Svg,
  size = 24,
  className,
  onClick,
}) => {
  return (
    <span
      className={clsx('icon', className)}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Svg />
    </span>
  )
}
