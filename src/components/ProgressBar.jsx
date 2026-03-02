import './ProgressBar.css';

/**
 * Progress: Page X of Y = (X/Y)*100%
 * X = current page (furthest reached), Y = total pages in book
 */
export default function ProgressBar({ currentPage = 0, totalPages = 1 }) {
  const current = Number(currentPage) || 0;
  const total = Math.max(1, Number(totalPages) || 1);
  const progress = total > 0 ? Math.min(100, (current / total) * 100) : 0;
  return (
    <div className="progress-bar">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="progress-label">Page {current} of {total} ({Math.round(progress)}%)</span>
    </div>
  );
}
