import './Buttons.css'
export default function Button({
  //defaults
  variant = 'primary ',
  children,
  className = '',
  text = '',
  onClick = {},
  karmDonor = false,
  type = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {text}
    </button>
  )
}
