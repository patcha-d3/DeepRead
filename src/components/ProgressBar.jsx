export default function ProgressBar({ currentPage = 0, totalPages = 1 }) {
  const progress = totalPages > 0 ? Math.min(100, (currentPage / totalPages) * 100) : 0;
  return (
    <div className="progress-bar">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="progress-label">{currentPage} / {totalPages} pages</span>
    </div>
  );
}
