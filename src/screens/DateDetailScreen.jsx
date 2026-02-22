import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LogCard from '../components/LogCard';
import { getLogsByDate } from '../store/db';

export default function DateDetailScreen() {
  const nav = useNavigate();
  const { date } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (date) setLogs(getLogsByDate(date));
  }, [date]);

  const formatted = date
    ? new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })
    : '';

  return (
    <div className="screen">
      <header className="header-small">
        <button type="button" onClick={() => nav(-1)}>‹ Back</button>
        <h2>{formatted}</h2>
      </header>
      <main className="main">
        {logs.length === 0 ? (
          <div className="empty-state">
            <p>No reading logs for this day.</p>
            <button className="btn-primary" onClick={() => nav('/log', { state: { date } })}>
              Add reflection
            </button>
          </div>
        ) : (
          logs.map((log) => (
            <LogCard
              key={log.id}
              log={log}
              book={{ title: log.title, author: log.author, coverUrl: log.coverUrl }}
            />
          ))
        )}
      </main>
    </div>
  );
}
