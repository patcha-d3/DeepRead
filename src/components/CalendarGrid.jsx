const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({ year, month, logsByDate, onSelectDate }) {
  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month - 1 + 1, 0);
  const startOffset = first.getDay();
  const daysInMonth = last.getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push({ type: 'empty' });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayLogs = logsByDate[date] || [];
    cells.push({ type: 'day', day: d, date, logs: dayLogs });
  }

  return (
    <div className="calendar-grid">
      <div className="calendar-header-row">
        {DAYS.map((d) => (
          <span key={d} className="day-label">{d}</span>
        ))}
      </div>
      <div className="calendar-cells">
        {cells.map((cell, idx) => {
          if (cell.type === 'empty') {
            return <div key={`e-${idx}`} className="cell cell-empty" />;
          }
          const hasLogs = cell.logs?.length > 0;
          const firstLog = hasLogs ? cell.logs[0] : null;
          const hasCover = !!firstLog?.coverUrl;
          return (
            <button
              key={cell.date}
              type="button"
              className={`cell${hasCover ? ' cell-has-cover' : ''}`}
              onClick={() => onSelectDate(cell.date)}
            >
              <span className="day-num">{cell.day}</span>
              {hasLogs && (
                firstLog?.coverUrl ? (
                  <img src={firstLog.coverUrl} alt="" className="day-thumb" referrerPolicy="no-referrer" />
                ) : (
                  <span className="day-dot">●</span>
                )
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
