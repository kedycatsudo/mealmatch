import './Buttons.css'
export default function Button({
  //defaults
  variant = 'primary ',
  children,
  className = '',
  ...props
}) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      Button
    </button>
  )
}
