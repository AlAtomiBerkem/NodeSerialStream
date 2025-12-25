import { type FC } from 'react'
import { classNames } from 'shared/lib'
import { Icon } from 'shared/ui/Icon/Index'
import ToggleSvg from 'shared/assets/toggle.svg?react'
import EclamationMarkSvg from 'shared/assets/EclamationMark.svg?react'
import FocusRombSvg from 'shared/assets/FocusRomb.svg?react'
import cls from './Accordion.module.scss'

export interface AccordionItemProps {
  id: string | number
  number?: string
  title: string
  content?: string
  items?: string[]
  smallTexts?: string[]
  icon?: 'info' | 'none'
  className?: string
  isOpen?: boolean
  onToggle?: () => void
  defaultOpen?: boolean
}

export const AccordionItem: FC<AccordionItemProps> = ({
  number,
  title,
  content,
  items,
  smallTexts,
  icon,
  className,
  isOpen: controlledIsOpen,
  onToggle,
  defaultOpen = false,
}) => {
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : defaultOpen

  const toggleOpen = () => {
    if (onToggle) {
      onToggle()
    }
  }

  return (
    <div className={classNames(cls.accordionItem, {}, [className])}>
      <div className={cls.header} onClick={toggleOpen}>
        <div className={cls.headerLeft}>
          {icon === 'info' && (
            <Icon
              Svg={EclamationMarkSvg}
              size={36}
              className={cls.infoIcon}
            />
          )}
          {number && !icon && (
            <span className={cls.number}>{number}</span>
          )}
          <h3 className={classNames(cls.title, { [cls.titleOpen]: isOpen })}>{title}</h3>
        </div>
        <Icon
          Svg={ToggleSvg}
          size={24}
          className={classNames(cls.toggleIcon, { [cls.toggleIconOpen]: isOpen })}
        />
      </div>
      <div className={cls.separator} />
      <div className={classNames(cls.content, { [cls.contentOpen]: isOpen })}>
        {content && <p className={cls.contentText}>{content}</p>}
        {items && items.length > 0 && (
          <ul className={cls.itemsList}>
            {items.map((item, index) => (
              <li key={index} className={cls.listItem}>
                <Icon Svg={FocusRombSvg} size={40} className={cls.rombIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {smallTexts && smallTexts.length > 0 && (
          <div className={cls.smallTextsContainer}>
            {smallTexts.map((text, index) => (
              <div key={index} className={cls.smallTextWrapper}>
                <p className={cls.smallText}>{text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

