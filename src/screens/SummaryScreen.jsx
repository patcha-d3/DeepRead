import { useNavigate, useParams } from 'react-router-dom';
import { getBook, getLogsByBook } from '../store/db';
import HeaderBack from '../components/HeaderBack';
import StatCard from '../components/StatCard';
import Chip from '../components/Chip';
import InfoCard from '../components/InfoCard';
import './SummaryScreen.css';
import { aggregateLogs } from '../utils/aggregateLogs';

export default function SummaryScreen() {
  const nav = useNavigate();
  const { bookId } = useParams();
  const book = bookId ? getBook(+bookId) : null;
  const logs = bookId ? getLogsByBook(+bookId) : [];
  const agg = aggregateLogs(logs);

  if (!book) return <div className="screen"><main className="main"><p>Book not found</p></main></div>;

  return (
    <div className="screen">
      <HeaderBack onBack={() => nav(-1)} />
      <main className="main summary-main">
        <h2>{book.title}</h2>
        {book.author && <p className="author">by {book.author}</p>}
        <div className="stats">
          <StatCard label="Total sessions" value={agg.totalSessions} />
          <StatCard label="Pages logged" value={agg.totalPagesLogged} />
          <StatCard label="Avg/session" value={agg.avgPagesPerSession} />
        </div>
        {Object.keys(agg.moodFrequency).length > 0 && (
          <section>
            <h3>Mood breakdown</h3>
            <div className="mood-breakdown">
              {Object.entries(agg.moodFrequency).map(([m, count]) => (
                <Chip key={m} variant="mood">
                  {m} {count}
                </Chip>
              ))}
            </div>
          </section>
        )}
        {agg.reflections.length > 0 && (
          <section>
            <h3>Reflection archive</h3>
            {agg.reflections.map((r, i) => (
              <InfoCard key={i} className="ref-card">
                <span className="ref-date">{r.date}</span>
                <span className="ref-pages">Pages {r.startPage}–{r.endPage}</span>
                {r.reflection && <p>{r.reflection}</p>}
                {r.quote && <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>}
              </InfoCard>
            ))}
          </section>
        )}
        {agg.quotes.length > 0 && (
          <section>
            <h3>Collected quotes</h3>
            {agg.quotes.map((q, i) => (
              <InfoCard key={i} className="quote-card">
                <p>&ldquo;{q.quote}&rdquo;</p>
                <span className="quote-date">{q.date}</span>
              </InfoCard>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
