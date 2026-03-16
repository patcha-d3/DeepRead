import './Chip.css';

export default function Chip({
  children,
  variant = 'default', // 'default' | 'add' | 'mood'
  active = false,
  className = '',
  ...props
}) {
  const baseClass =
    variant === 'add'
      ? 'chip-add'
      : variant === 'mood'
      ? 'mood-chip'
      : 'chip';

  const classes = [baseClass, active && 'active', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}

