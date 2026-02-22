import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarGrid from '../components/CalendarGrid';
import { getLogsForMonth } from '../store/db';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function CalendarScreen() {
  const nav = useNavigate();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [logsByDate, setLogsByDate] = useState({});

  const load = useCallback(() => {
    const rows = getLogsForMonth(year, month);
    const byDate = {};
    rows.forEach((r) => {
      if (!byDate[r.date]) byDate[r.date] = [];
      byDate[r.date].push(r);
    });
    setLogsByDate(byDate);
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
    <div className="screen">
      <header className="header">
        <h1>Book Calendar</h1>
        <p>Simply tap on the date to view your reading journals.</p>
      </header>
      <main className="main">
        <div className="month-nav">
          <button type="button" onClick={prev}>‹</button>
          <h2>{MONTHS[month - 1]} {year}</h2>
          <button type="button" onClick={next}>›</button>
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
