import { useId } from 'react'
import './Inputs.css'
export default function Input({
  checked = true,
  variant = 'primary',
  children,
  className = '',
  id,
  placeholder = '',
  type = 'text',
  value,
  onChange,
  required = false,
  autoComplete = 'current-password',
  text = '',
  ...pr
}) {
  const autoId = useId()
  const inputId = id || autoId
  return (
    <>
      <label className={`label label-${variant}`} htmlFor={inputId}>
        {text}
      </label>
      <input
        className={`input input-${variant} ${className}`}
        id={inputId}
        placeholder={placeholder}
        type={type}
        checked={type === 'checkbox' ? checked : undefined}
        value={type !== 'checkbox' ? value : undefined} // text uses value        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        onChange={onChange}
        {...pr}
      ></input>
    </>
  )
}
