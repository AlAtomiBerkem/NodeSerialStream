import { useState, useRef, useEffect } from 'react'
import { DiamondBtn } from 'shared/ui/DiabondBtn'
import styles from './AccordionGroup.module.scss'
import { classNames } from 'shared/lib'

type Props = {
  number?: string
  name?: string
  description?: string
  defaultOpen?: boolean
  isOpen?: boolean
  onToggle?: (next: boolean) => void
  onButtonClick?: (number: string) => void
}

export const Accordion = ({
  number = '01',
  name = '',
  description = '',
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onToggle,
  onButtonClick
}: Props) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen

  const contentRef = useRef<HTMLDivElement | null>(null)
  const [maxHeight, setMaxHeight] = useState('0px')

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight + 'px')
    } else {
      setMaxHeight('0px')
    }
  }, [isOpen])

  const toggle = () => {
    if (typeof onToggle === 'function') {
      onToggle(!isOpen)
    } else {
      setInternalOpen(v => !v)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.iconWrapper}>
        <DiamondBtn
          number={number}
          pushed={isOpen}
          noScale
        />
      </div>

      <div className={styles.content}>
        <button
          type="button"
          onClick={() => {
            toggle()
            onButtonClick?.(number)
          }}
          aria-expanded={isOpen}
          className={styles.headerBtn}
        >
          <span
            className={classNames(
              styles.title,
              { [styles.titleOpen]: isOpen }
            )}
          >
            {name}
          </span>
        </button>

        <div
          ref={contentRef}
          style={{ maxHeight }}
          className={styles.collapse}
        >
          <div className={styles.inner}>
            <hr className={styles.divider} />
            <div className={styles.description}>
              {description || '\u00A0'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
