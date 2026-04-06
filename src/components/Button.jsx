import './Button.css';

export default function Button({
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}) {
  const merged = ['btn', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={merged} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
