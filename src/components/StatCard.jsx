import './StatCard.css';

export default function StatCard({ label, value, className = '' }) {
  return (
    <div className={`stat-card ${className}`.trim()}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

