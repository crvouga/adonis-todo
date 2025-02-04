export interface AlertProps {
  message: string
  variant: 'error' | 'warning' | 'success' | 'info'
  className?: string
}

export function Alert({ message, variant, className = '' }: AlertProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      aria-label={variant.charAt(0).toUpperCase() + variant.slice(1)}
      data-testid={`alert-${variant}`}
      className={`alert alert-${variant} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  )
}
