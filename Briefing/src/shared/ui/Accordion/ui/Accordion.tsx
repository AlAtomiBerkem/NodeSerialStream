import { type FC, useState } from 'react'
import { classNames } from 'shared/lib'
import { AccordionItem, type AccordionItemProps } from './AccordionItem'
import cls from './Accordion.module.scss'

export interface AccordionProps {
  items: AccordionItemProps[]
  className?: string
  allowMultiple?: boolean
  defaultOpenId?: string | number
}

export const Accordion: FC<AccordionProps> = ({
  items,
  className,
  allowMultiple = false,
  defaultOpenId,
}) => {
  const [openIds, setOpenIds] = useState<Set<string | number>>(
    defaultOpenId ? new Set([defaultOpenId]) : new Set()
  )

  const handleToggle = (id: string | number) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        if (!allowMultiple) {
          newSet.clear()
        }
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className={classNames(cls.accordion, {}, [className])}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          {...item}
          isOpen={openIds.has(item.id)}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </div>
  )
}

