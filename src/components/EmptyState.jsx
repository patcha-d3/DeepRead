import './EmptyState.css';

export default function EmptyState({
  title,
  body,
  children,
  className = '',
}) {
  return (
    <div className={`empty-state ${className}`.trim()}>
      {title && <p>{title}</p>}
      {body && <p className="hint">{body}</p>}
      {children}
    </div>
  );
}

