import './Inputs.css'
export default function Input({
  checked = true,
  variant = 'primary',
  children,
  className = '',
  id = '',
  placeholder = '',
  type = 'text',
  value,
  onChange,
  required = false,
  autoComplete = 'current-password',

  ...pr
}) {
  return (
    <div>
      <label className={`label label-${variant}`} htmlFor={id}></label>
      <input
        className={`input input-${variant} ${className}`}
        id={id}
        placeholder={placeholder}
        type={type}
        checked={type === 'checkbox' ? checked : undefined}
        value={type !== 'checkbox' ? value : undefined} // text uses value        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        onChange={onChange}
        {...pr}
      ></input>
    </div>
  )
}
