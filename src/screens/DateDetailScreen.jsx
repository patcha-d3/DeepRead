import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import HeaderBack from '../components/HeaderBack';
import EmptyState from '../components/EmptyState';
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
      <HeaderBack
        title={formatted}
        onBack={() => nav(-1)}
      />
      <main className="main">
        {logs.length === 0 ? (
          <EmptyState title="No reading logs for this day.">
            <Button onClick={() => nav('/log', { state: { date } })}>
              Add reflection
            </Button>
          </EmptyState>
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
