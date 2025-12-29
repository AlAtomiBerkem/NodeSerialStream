import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Accordion } from './Acardion'
import styles from './AccordionGroup.module.scss'
import { classNames } from 'shared/lib'

type AccordionItem = {
  number: string
  name: string
  description: string
}

type Props = {
  items?: AccordionItem[]
  onButtonClick?: (number: string) => void
}

export const AccordionGroup = ({ items = [], onButtonClick }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { activeButton } = useSelector((state: any) => state.buttons)

  useEffect(() => {
    if (activeButton) {
      const index = items.findIndex(item => item.number === activeButton)
      if (index !== -1) {
        setOpenIndex(index)
      }
    } else {
      setOpenIndex(null)
    }
  }, [activeButton, items])

  return (
    <div className={classNames(styles.wrapper)}>
      {items.map((item, index) => (
        <Accordion
          key={index}
          number={item.number}
          name={item.name}
          description={item.description}
          isOpen={openIndex === index}
          onToggle={(next: any) => {
            const nextOpen = next ? index : null
            setOpenIndex(nextOpen)
            if (next) {
              onButtonClick?.(item.number)
            }
          }}
          onButtonClick={onButtonClick}
        />
      ))}
    </div>
  )
}
