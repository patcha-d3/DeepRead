import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarGrid from '../components/CalendarGrid';
import { getLogsForMonth } from '../store/db';
import { getReadingStreak } from '../utils/readingStreak';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function CalendarScreen() {
  const nav = useNavigate();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [logsByDate, setLogsByDate] = useState({});
  const [streak, setStreak] = useState(0);

  const load = useCallback(() => {
    const rows = getLogsForMonth(year, month);
    const byDate = {};
    rows.forEach((r) => {
      if (!byDate[r.date]) byDate[r.date] = [];
      byDate[r.date].push(r);
    });
    setLogsByDate(byDate);
    setStreak(getReadingStreak());
  }, [year, month]);

  useEffect(() => { load(); }, [load]);

  const prev = () => {
    if (month === 1) { setMonth(12); setYear((y) => y - 1); } else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 12) { setMonth(1); setYear((y) => y + 1); } else setMonth((m) => m + 1);
  };

  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  return (
    <div className="screen journey-screen">
      <header className="journey-header">
        <h1>Reading Journey</h1>
        <div className="streak-badge">
          <span className="streak-num">{streak}</span>
          <span className="streak-label">day streak</span>
        </div>
      </header>
      <main className="main">
        <div className="month-nav">
          <button type="button" onClick={prev} aria-label="Previous month">&lt;</button>
          <h2>{MONTHS[month - 1]} {year}</h2>
          <button type="button" onClick={next} aria-label="Next month">&gt;</button>
        </div>
        <CalendarGrid
          year={year}
          month={month}
          logsByDate={logsByDate}
          onSelectDate={(d) => nav(`/date/${d}`)}
        />
        <button className="cta" onClick={() => nav('/log', { state: { date: today } })}>
          Reflect on today&apos;s reading
        </button>
      </main>
    </div>
  );
}
