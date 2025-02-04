export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  className?: string
  disabled?: boolean
  children: React.ReactNode
}

export function Button({
  type = 'button',
  color = 'primary',
  className = '',
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button type={type} className={`btn btn-${color} w-full ${className}`} disabled={disabled}>
      {children}
    </button>
  )
}
