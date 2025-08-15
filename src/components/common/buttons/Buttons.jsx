import './Buttons.css'
export default function Button({
  //defaults
  variant = 'primary ',
  children,
  className = '',
  text = '',
  ...props
}) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {text}
    </button>
  )
}
