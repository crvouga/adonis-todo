export interface TextFieldProps {
  label: string
  type?: string
  placeholder?: string
  className?: string
  value: string
  onChange: (value: string) => void
}

export function TextField({
  label,
  type = 'text',
  placeholder,
  className = '',
  value,
  onChange,
}: TextFieldProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered w-full ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
