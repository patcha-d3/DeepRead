import './InfoCard.css';

export default function InfoCard({
  title,
  subtitle,
  children,
  className = '',
}) {
  return (
    <div className={className}>
      {title && <h3>{title}</h3>}
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  );
}

