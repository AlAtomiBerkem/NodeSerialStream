import { useState } from 'react'
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

  return (
    <div className={classNames(styles.wrapper)}>
      {items.map((item, index) => (
        <Accordion
          key={index}
          number={item.number}
          name={item.name}
          description={item.description}
          isOpen={openIndex === index}
          onToggle={(next: any) => setOpenIndex(next ? index : null)}
          onButtonClick={onButtonClick}
        />
      ))}
    </div>
  )
}
