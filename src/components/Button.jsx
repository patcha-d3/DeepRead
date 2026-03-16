export default function Button({
  children,
  variant = 'primary', // 'primary' | 'outline' | 'ghost'
  as = 'button',
  className = '',
  ...props
}) {
  const Comp = as;
  const baseClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'outline'
      ? 'btn-outline'
      : variant === 'ghost'
      ? 'btn-ghost'
      : '';

  const merged = [baseClass, className].filter(Boolean).join(' ');

  return (
    <Comp className={merged} {...props}>
      {children}
    </Comp>
  );
}

