import { ReactNode } from 'react'
import { Link } from '@inertiajs/react'

export interface DropdownMenuProps {
  trigger: ReactNode
  items: {
    label: string
    onClick?: () => void
    href?: string
  }[]
  align?: 'start' | 'end'
  className?: string
}

export default function DropdownMenu({
  trigger,
  items,
  align = 'end',
  className = '',
}: DropdownMenuProps) {
  return (
    <div className={`dropdown dropdown-${align} ${className}`}>
      <label tabIndex={0} className="cursor-pointer">
        {trigger}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <button onClick={item.onClick}>{item.label}</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
