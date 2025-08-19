import './Inputs.css'
export default function Input({
  variant = 'primary',
  children,
  className = '',
  id = '',
  placeholder = '',
  type = '',
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
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        {...pr}
      ></input>
    </div>
  )
}
