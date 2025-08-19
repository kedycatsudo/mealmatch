import './Checkbox.css'
export default function Checkbox({
  variant = 'primary',
  checked = false,
  text = '',
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
    <div className="checbox_container">
      <span className="checbox__container-span">{text}</span>
      <input
        className={`checkbox checkbox-${variant} ${className}`}
        id={id}
        type={type}
        onChange={onChange}
        checked={checked}
        required={required}
        {...pr}
      ></input>
    </div>
  )
}
