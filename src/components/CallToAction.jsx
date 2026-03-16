import './CallToAction.css';

export default function CallToAction({
  children,
  className = '',
  ...props
}) {
  return (
    <button
      className={['cta', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

