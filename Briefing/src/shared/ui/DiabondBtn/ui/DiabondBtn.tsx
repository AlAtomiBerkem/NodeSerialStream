import styles from './DiabondBtn.module.scss'
import { classNames } from 'shared/lib'

type Props = {
  number?: string
  pushed?: boolean
  noScale?: boolean
  onClick?: () => void
}

export const DiamondBtn = ({
  number = '01',
  pushed = false,
  noScale = false,
  onClick,
  ...props
}: Props) => {
  const strokeColor = '#72D8FF'
  const fillColor = pushed ? strokeColor : '#1a1a1a'
  const textFillColor = pushed ? '#000000' : strokeColor

  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={classNames(
        styles.button,
        {
          [styles.pushed]: pushed && !noScale,
          [styles.noScale]: noScale
        }
      )}
      {...props}
    >
      <path
        d="M41.293 21L21 41.293L0.707031 21L21 0.707031L41.293 21Z"
        fill={fillColor}
        stroke={strokeColor}
        className={styles.shape}
      />

      <text
        x="21"
        y="24"
        fill={textFillColor}
        className={styles.text}
      >
        {number}
      </text>
    </svg>
  )
}
