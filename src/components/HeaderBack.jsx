import './HeaderBack.css';

export default function HeaderBack({
  title,
  onBack,
  children,
}) {
  return (
    <header className="header-small">
      <button type="button" onClick={onBack}>‹ Back</button>
      {title && <h2>{title}</h2>}
      {children}
    </header>
  );
}

